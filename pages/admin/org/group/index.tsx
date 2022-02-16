// @flow
import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BreadCrumb } from '../../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../../components/Page/PageBanner';
import { useToast } from '../../../../components/Toast/ToastContext';
import { GET_GROUPS_BY_ORG_QUERY } from '../../../../graphql/query/getGroupsByOrg';
import { IGroup } from '../../../../models/OrgModel';
import { ERoutes } from '../../../../models/Routes';
import { EUserPermissions } from '../../../../models/UserModel';
import { UserPermissionDetails } from '../../../../models/UserPermission';
import theme from '../../../../theme/theme.json';

const Admin_Query = `
query GetGroupsByOrg($orgIDs:[String!]){
  ${GET_GROUPS_BY_ORG_QUERY}
}
`;
function GroupPage() {
  const [fetchAdminData, { loading }] = useManualQuery(Admin_Query);
  const { addToast } = useToast();
  const [groups, setGroups] = useState<Array<IGroup>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;

  useEffect(() => {
    console.log(myUser);
    const orgs = myUser?.orgs.map((o) => o.org.id);
    getAdminData(orgs || []);
  }, [myUser]);

  async function getAdminData(orgIDs: Array<string>) {
    const adminData = await fetchAdminData({
      variables: {
        orgIDs: orgIDs,
      },
    });
    console.log(adminData);
    if (adminData.error) {
      console.error(adminData.error);
      addToast('Error Loading Data', theme.BASE_COLOR.error);
    }
    if (adminData.data?.getGroupsByOrg) {
      setGroups(adminData.data?.getGroupsByOrg);
    }
  }

  return (
    <div>
      <PageBanner title="Groups" />
      <main className="p-2">
        <BreadCrumb />
        <div className="w-full flex flex-wrap">
          {groups.map(({ id, name, permissions }) => (
            <div
              key={id}
              className={`rounded-md p-3 m-1 group border bg-white border-gray-400 relative w-full md:w-[calc(50%-0.5em)]`}
            >
              <p className="text-lg">
                <Link
                  href={{
                    pathname: ERoutes.ADMIN_EDIT_GROUPS,
                    query: { groupID: id },
                  }}
                  passHref
                >
                  <a>{name}</a>
                </Link>
              </p>
              <p className="text-tiny">
                Permissions:
                {permissions.map((p: string) => {
                  return UserPermissionDetails[p] !== undefined ? (
                    <span
                      className={`px-1 border-r border-black last-of-type:border-0 ${
                        p === EUserPermissions.IS_ADMIN && 'text-orange-500'
                      }`}
                      key={p}
                    >
                      {UserPermissionDetails[p].title}
                    </span>
                  ) : null;
                })}
                {permissions.length === 0 && (
                  <span className="px-1 border-r border-black text-rose-400  last-of-type:border-0">
                    No Permissions
                  </span>
                )}
                {!permissions.includes(EUserPermissions.CAN_VIEW_POST) && (
                  <span className="px-1 border-r border-black text-rose-400  last-of-type:border-0">
                    Cannot View Posts
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default GroupPage;
