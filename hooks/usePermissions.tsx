import { useSession } from 'next-auth/react';
import { EPostPermission } from '../models/PostModel';
import { EUserPermissions } from '../models/UserModel';

interface IUsePermissions {
  orgID?: string;
  hasPermissions?: Array<EUserPermissions | EPostPermission | string>;
  hasNotPermissions?: Array<EUserPermissions | EPostPermission | string>;
  additionalPermissions?: Array<string>;
}

export function usePermissions() {
  const { data: session } = useSession();
  const myUser = session?.user;
  function userHasPermissions({
    orgID = '',
    hasPermissions = [],
    hasNotPermissions = [],
    additionalPermissions = [],
  }: IUsePermissions): boolean {
    let myPermissions: Array<string | EUserPermissions> = [];
    let localPermissions = null;
    if (typeof window !== 'undefined') {
      localPermissions =
        localStorage !== undefined
          ? localStorage.getItem('devPermissions')
          : '';
    }

    if (localPermissions !== null) {
      myPermissions = JSON.parse(localPermissions);
    } else if (orgID === '') {
      myPermissions =
        session?.user.orgs.map((o) => o?.group?.permissions).flat() || [];
    } else {
      myPermissions =
        myUser?.orgs.find((o) => o.org.id === orgID)?.group?.permissions || [];
    }

    const totalPermissions: Array<string> = [
      ...additionalPermissions,
      ...myPermissions,
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

  function isLoggedIn() {
    return !session?.user;
  }

  return { userHasPermissions, postHasPermissions, isLoggedIn };
}
