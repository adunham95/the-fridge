import { useSession } from 'next-auth/react';
import { EPostPermission } from '../models/PostModel';
import { EUserPermissions } from '../models/UserModel';

export function usePermissions() {
  const { data: session } = useSession();
  const myUser = session?.user;
  function userHasPermissions(
    orgID: string,
    hasPermissions: Array<EUserPermissions | EPostPermission | string>,
    hasNotPermissions: Array<EUserPermissions | EPostPermission | string>,
    additionalPermissions: Array<string> = [],
  ): boolean {
    const myPermissions = myUser?.orgs.find((o) => o.org.id === orgID);
    const allUserPermissions: Array<string | EUserPermissions> =
      myPermissions?.group.permissions || [];
    const totalPermissions: Array<string> = [
      ...additionalPermissions,
      ...allUserPermissions,
    ];
    const hasRequired =
      hasPermissions.length > 0
        ? hasPermissions.every((v) => totalPermissions.includes(v))
        : true;
    const hasNotRequired =
      hasNotPermissions.length > 0
        ? !hasNotPermissions.every((v) => totalPermissions.includes(v))
        : true;
    return hasRequired && hasNotRequired;
  }
  function postHasPermissions() {}

  return { userHasPermissions, postHasPermissions };
}
