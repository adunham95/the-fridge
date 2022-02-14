// @flow
import { useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Loader } from '../../../../components/Loader/Loader';
import { BreadCrumb } from '../../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../../components/Page/PageBanner';
import { useToast } from '../../../../components/Toast/ToastContext';
import { GET_GROUPS_BY_ORG_QUERY } from '../../../../graphql/query/getGroupsByOrg';
import { GET_USERS_BY_ORG_QUERY } from '../../../../graphql/query/getUsersByOrg';

const Admin_Query = `
query GetGroupsByOrg($orgIDs:[String!]){
  ${GET_GROUPS_BY_ORG_QUERY}
  ${GET_USERS_BY_ORG_QUERY}
}
`;

interface IUser {
  name: string;
  id: string;
  email?: string;
}

interface IGroup {
  id: string;
  name: string;
}

export function EditUserGroups() {
  const { query } = useRouter();
  const [fetchAdminData, { loading }] = useManualQuery(Admin_Query);
  const { addToast } = useToast();
  const [groups, setGroups] = useState<Array<IGroup>>([]);
  const [users, setUsers] = useState<Array<IUser>>([]);

  useEffect(() => {
    if (query.orgID !== undefined && !Array.isArray(query.orgID)) {
      console.log(query.orgID);
      getAdminData(query.orgID);
    }
  }, [query]);

  async function getAdminData(orgID: string) {
    const adminData = await fetchAdminData({
      variables: {
        orgIDs: [orgID],
      },
    });
    console.log(adminData);
    if (adminData.error) {
      console.error(adminData.error);
      addToast('Error Loading Data');
    }
    if (adminData.data?.getGroupsByOrg) {
      setGroups(adminData.data?.getGroupsByOrg);
    }
    if (adminData.data?.getUsersByOrg) {
      setUsers(adminData.data?.getUsersByOrg);
    }
  }

  return (
    <div>
      <PageBanner title="Edit Org Group" />
      <main className="pt-2 px-2">
        <BreadCrumb />
        {loading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
        <div className="flex">
          <div className=" w-1/3">
            {users.map((usr) => (
              <div
                key={usr.id}
                className="bg-white p-2 rounded-md m-1 flex items-center hover:shadow-md"
              >
                <Avatar name={usr.name} />
                <p>{usr.name}</p>
              </div>
            ))}
          </div>
          <div className="w-2/3">
            {groups.map((g) => (
              <div key={g.id} className="bg-white rounded-md p-3 mb-1">
                <p className="text-lg">{g.name}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

EditUserGroups.Auth = true;

export default EditUserGroups;
