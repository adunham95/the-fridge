import { useSession } from 'next-auth/react';
import { Avatar } from '../../components/Avatar/Avatar';
import { DashboardLink } from '../../components/Dashboard/DashboardLink';
import { EIcons } from '../../components/Icons';
import { BreadCrumb } from '../../components/nav/BreadCrumb';
import { usePermissions } from '../../hooks/usePermissions';
import { ERoutes } from '../../models/Routes';
import { EUserPermissions } from '../../models/UserModel';

const AdminHome = () => {
  const { data: session } = useSession();
  const myUser = session?.user;
  const { userHasPermissions } = usePermissions();

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
          <Avatar name={myUser?.name || 'A'} color={myUser?.accountColor} />
          <h1 className="text-3xl font-bold text-gray-900 inline-block">
            {myUser?.name}
          </h1>
        </div>
      </header>
      <main className="pt-2 px-1">
        <BreadCrumb />
        <div className="flex flex-wrap">
          <DashboardLink
            href={ERoutes.ADMIN_NEW_GROUP}
            title="New Group"
            icon={EIcons.USERS_PLUS}
          />
          <DashboardLink
            href={ERoutes.ADMIN_EDIT_ORG}
            title="Edit Org"
            icon={EIcons.USERS_COG}
          />
          <DashboardLink
            href={ERoutes.ADMIN_GROUPS}
            title="Groups"
            icon={EIcons.USERS}
          />
          <DashboardLink
            href={ERoutes.ADMIN_USERS}
            title="Users"
            icon={EIcons.USERS}
          />
          {userHasPermissions({
            hasPermissions: [EUserPermissions.CAN_APPROVE_POSTS],
          }) && (
            <DashboardLink
              href={ERoutes.ADMIN_APPROVE_POSTS}
              title="Approve Posts"
              icon={EIcons.VOTE}
            />
          )}
        </div>
      </main>
    </>
  );
};

AdminHome.auth = true;
AdminHome.permissions = [EUserPermissions.IS_ADMIN];

export default AdminHome;
