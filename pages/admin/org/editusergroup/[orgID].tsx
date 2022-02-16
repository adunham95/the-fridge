// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { EIcons } from '../../../../components/Icons';
import IconGrab from '../../../../components/Icons/Icon-Grab';
import { Loader } from '../../../../components/Loader/Loader';
import { BreadCrumb } from '../../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../../components/Page/PageBanner';
import { Button } from '../../../../components/StatelessInput/Button';
import { useToast } from '../../../../components/Toast/ToastContext';
import { UPDATE_USER_GROUPS_MUTATION } from '../../../../graphql/mutation/updateUserGroup';
import { GET_GROUPS_BY_ORG_QUERY } from '../../../../graphql/query/getGroupsByOrg';
import { GET_USERS_BY_ORG_QUERY } from '../../../../graphql/query/getUsersByOrg';
import { ERoutes } from '../../../../models/Routes';
import { EUserPermissions } from '../../../../models/UserModel';
import { UserPermissionDetails } from '../../../../models/UserPermission';
import theme from '../../../../theme/theme.json';

const Admin_Query = `
query GetGroupsByOrg($orgIDs:[String!]){
  ${GET_GROUPS_BY_ORG_QUERY}
  ${GET_USERS_BY_ORG_QUERY}
}
`;

export const DragTypes = {
  USER_CARD: 'userCard',
};

interface IUser {
  name: string;
  id: string;
  email?: string;
  orgs: Array<IUserOrg>;
}

interface IUserOrg {
  org: {
    id: string,
    name: string,
  };
  group: {
    id: string,
    name: string,
  } | null;
}

interface IGroup {
  id: string;
  name: string;
  permissions: Array<string>;
}

export function EditUserGroups() {
  const { query } = useRouter();
  const [fetchAdminData, { loading }] = useManualQuery(Admin_Query);
  const [updateUserGroups] = useMutation(UPDATE_USER_GROUPS_MUTATION);
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
      addToast('Error Loading Data', theme.BASE_COLOR.error);
    }
    if (adminData.data?.getGroupsByOrg && adminData.data?.getUsersByOrg) {
      setUsers(adminData.data?.getUsersByOrg);
      setGroups(adminData.data?.getGroupsByOrg);
    }
  }

  function setUserGroup(userID: string, groupID: string) {
    const currentUsers = [...users];
    // console.log(currentUsers);
    // console.log({
    //   userID,
    //   groupID,
    // });
    const selectedUser = currentUsers.find((usr) => usr.id === userID);

    //No orgs throw error
    if (!selectedUser?.orgs) {
      return;
    }

    const currentOrgIndex =
      selectedUser?.orgs.findIndex((orgs) => orgs.org.id === query.orgID) || 0;

    //Org Index Doesn't Exists
    if (currentOrgIndex > 0) {
      return;
    }

    console.log(selectedUser?.orgs[currentOrgIndex]);

    const updatedGroup = {
      group: {
        ...selectedUser?.orgs[currentOrgIndex].group,
        id: groupID,
        name: 'Group Name',
      },
      org: {
        ...selectedUser?.orgs[currentOrgIndex].org,
      },
    };

    selectedUser.orgs[currentOrgIndex] = updatedGroup;

    setUsers(currentUsers);
  }

  async function saveChanges() {
    const userData = users
      .map((u) => {
        if (query.orgID === undefined && Array.isArray(query.orgID)) {
          return null;
        }
        const selectedOrgData = u.orgs.find((o) => o.org.id === query.orgID);
        if (selectedOrgData?.group === null) {
          return null;
        }
        console.log(selectedOrgData?.group);
        return {
          userID: u.id,
          groupID: selectedOrgData?.group.id,
          orgID: query.orgID,
        };
      })
      .filter((u) => u !== null);

    console.log(userData);
    const { data, error } = await updateUserGroups({
      variables: { users: userData },
    });
    if (data) {
      addToast('User Groups Updated', theme.BASE_COLOR.success, EIcons.BELL);
    }
    if (error) {
      addToast('Error updating groups', theme.BASE_COLOR.error, EIcons.WARNING);
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
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col md:flex-row">
            <div className="w-full pb-2 flex md:block overflow-x-auto sticky top-0 z-10 md:static md:w-1/3">
              {users
                .filter((usr) => {
                  const isInOrg = usr.orgs?.filter((org) => {
                    if (org?.org?.id === query.orgID) {
                      return org.group === null;
                    }
                    return false;
                  });
                  return isInOrg.length > 0;
                })
                .map((usr) => (
                  <UserCard key={usr.id} {...usr} />
                ))}
            </div>
            <div className="w-full md:w-2/3">
              {groups.map((g) => (
                <GroupCard
                  key={g.id}
                  setUserGroup={setUserGroup}
                  {...g}
                  currentUsers={users.filter((usr) => {
                    const inThisGroup = usr.orgs?.filter(
                      (org) => org?.group?.id === g.id,
                    );
                    return inThisGroup.length > 0;
                  })}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={saveChanges} className="bg-emerald-400 text-white">
              Save Changes
            </Button>
          </div>
        </DndProvider>
      </main>
    </div>
  );
}

interface IGroupCard extends IGroup {
  currentUsers: Array<IUser>;
  setUserGroup: (userID: string, id: string) => void;
}

interface DrapProps {
  id: string;
}

function GroupCard({
  name,
  id,
  permissions,
  currentUsers,
  setUserGroup,
}: IGroupCard) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragTypes.USER_CARD,
      drop: (user: DrapProps) => setUserGroup(user.id, id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return (
    <div
      ref={drop}
      className={`rounded-md p-3 mb-1 group border bg-white border-gray-400 relative`}
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
      <div className={`p-1 flex flex-wrap`}>
        {currentUsers.map((usr) => (
          <UserCard key={usr.id} {...usr} />
        ))}
        {isOver && (
          <span className="absolute inset-0 bg-teal-400 bg-opacity-25 flex justify-center items-center">
            Drop Here
          </span>
        )}
      </div>
    </div>
  );
}

function UserCard(usr: IUser) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.USER_CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { id: usr.id },
  }));

  return (
    <div
      ref={drag}
      className="bg-white border border-gray-400 p-1 rounded-md m-1 flex items-center hover:shadow-md cursor-grab w-auto"
      draggable
    >
      <span className="pr-2">
        <IconGrab width={10} />
      </span>
      <Avatar
        name={usr.name}
        height="h-[1.5em]"
        width="w-[1.5em]"
        className="text-xs"
      />
      <p className="whitespace-nowrap md:whitespace-normal">{usr.name}</p>
    </div>
  );
}

EditUserGroups.Auth = true;
EditUserGroups.permissions = [EUserPermissions.IS_ADMIN];

export default EditUserGroups;
