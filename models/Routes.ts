export enum ERoutes {
  WALL = '/',
  ADMIN = '/admin',
  ADMIN_NEW_GROUP = '/admin/newGroup',
  ADMIN_EDIT_ORG = '/admin/editOrg',
  ADMIN_EDIT_USER_GROUPS = '/admin/editUserGroups',
  AUTH = '/auth',
  AUTH_SIGN_IN = '/api/auth/signin',
  AUTH_SIGN_OUT = '/api/auth/signout',
  AUTH_SIGN_UP = '/auth/new-user',
  USER = '/user',
  TIMELINE = '/timeline',
}

interface IRouteName {
  [x: string]: string;
}

export const RouteNames: IRouteName = {
  [ERoutes.WALL]: 'Wall',
  [ERoutes.ADMIN]: 'Admin',
  [ERoutes.ADMIN_NEW_GROUP]: 'New Group',
  [ERoutes.ADMIN_EDIT_ORG]: 'Edit Org',
  [ERoutes.ADMIN_EDIT_USER_GROUPS]: 'Edit User Groups',
  [ERoutes.AUTH]: 'Auth',
  [ERoutes.AUTH_SIGN_IN]: 'Sign In',
  [ERoutes.AUTH_SIGN_UP]: 'Sign Up',
  [ERoutes.USER]: 'My Profile',
  [ERoutes.TIMELINE]: 'Timeline',
};
