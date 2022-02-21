import { useSession } from 'next-auth/react';
import { usePermissions } from '../../hooks/usePermissions';
import { reloadSession } from '../../util/auth';
import IconLock from '../Icons/Icon-lock';

interface IAuth {
  children: React.ReactNode;
  permissions?: Array<string>;
}

function AuthWrapper({ children, permissions = [] }: IAuth) {
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;
  const { userHasPermissions } = usePermissions();

  //TODO Clean up
  const myPermissions =
    session?.user.orgs.map((o) => o.group.permissions).flat() || [];

  const found = myPermissions.some((r) => (permissions || []).includes(r));

  console.log(
    userHasPermissions({
      hasPermissions: permissions,
    }),
  );
  if (isUser) {
    if (
      userHasPermissions({
        hasPermissions: permissions,
      })
    ) {
      return <>{children}</>;
    }
    // else if (permissions.length === 0) {
    //   return <>{children}</>;
    // }
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <span className=" text-red-500 pb-2">
          <IconLock height={100} width={100} />
        </span>
        You do not have permission to view this page
      </div>
    );
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}

export default AuthWrapper;
