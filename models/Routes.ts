export enum ERoutes {
  WALL = '/',
  ADMIN = '/admin',
  ADMIN_NEW_GROUP = '/admin/newGroup',
  ADMIN_EDIT_ORG = '/admin/editOrg',
  ADMIN_ORG = '/admin/org',
  ADMIN_ORG_USER_GROUP = '/admin/org/editusergroup',
  ADMIN_EDIT_USER_GROUPS = '/admin/org/editusergroup/[orgID]',
  AUTH = '/auth',
  AUTH_SIGN_IN = '/api/auth/signin',
  AUTH_SIGN_OUT = '/api/auth/signout',
  AUTH_SIGN_UP = '/auth/new-user',
  USER = '/account',
  TIMELINE = '/timeline',
  THEME = '/theme',
}

interface IRouteName {
  [x: string]: string;
}

export const RouteNames: IRouteName = {
  [ERoutes.WALL]: 'Wall',
  [ERoutes.ADMIN]: 'Admin',
  [ERoutes.ADMIN_NEW_GROUP]: 'New Group',
  [ERoutes.ADMIN_EDIT_ORG]: 'Edit Org',
  [ERoutes.ADMIN_ORG]: 'Org',
  [ERoutes.ADMIN_EDIT_ORG]: 'Edit Org',
  [ERoutes.ADMIN_ORG_USER_GROUP]: 'User Group',
  [ERoutes.ADMIN_EDIT_USER_GROUPS]: 'Edit User Groups',
  [ERoutes.AUTH]: 'Auth',
  [ERoutes.AUTH_SIGN_IN]: 'Sign In',
  [ERoutes.AUTH_SIGN_UP]: 'Sign Up',
  [ERoutes.USER]: 'My Profile',
  [ERoutes.TIMELINE]: 'Timeline',
};
