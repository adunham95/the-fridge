export enum ERoutes {
  WALL = '/',
  ADMIN = '/admin',
  ADMIN_EDIT_ORG = '/admin/org',
  ADMIN_ORG_USER_GROUP = '/admin/org/editusergroup',
  ADMIN_EDIT_USER_GROUPS = '/admin/org/editusergroup/[orgID]',
  ADMIN_NEW_GROUP = '/admin/org/group/new',
  ADMIN_GROUPS = '/admin/org/group',
  ADMIN_EDIT_GROUPS = '/admin/org/group/[groupID]',
  AUTH = '/auth',
  AUTH_SIGN_IN = '/auth/login',
  AUTH_SIGN_OUT = '/api/auth/signout',
  AUTH_SIGN_UP = '/auth/new-user',
  USER = '/account',
  TIMELINE = '/timeline',
  THEME = '/theme',
  ADMIN_APPROVE_POSTS = '/admin/approvePosts',
  TOS = '/tos',
  PRIVACY_POLICY = '/privacy',
  CONTACT = '/contact',
}

interface IRouteName {
  [x: string]: string;
}

export const RouteNames: IRouteName = {
  [ERoutes.WALL]: 'Wall',
  [ERoutes.ADMIN]: 'Admin',
  [ERoutes.ADMIN_NEW_GROUP]: 'New Group',
  [ERoutes.ADMIN_EDIT_ORG]: 'Edit Org',
  [ERoutes.ADMIN_ORG_USER_GROUP]: 'User Group',
  [ERoutes.ADMIN_EDIT_USER_GROUPS]: 'Edit User Groups',
  [ERoutes.ADMIN_GROUPS]: 'Org Groups',
  [ERoutes.ADMIN_EDIT_GROUPS]: 'Org Groups',
  [ERoutes.AUTH]: 'Auth',
  [ERoutes.AUTH_SIGN_IN]: 'Sign In',
  [ERoutes.AUTH_SIGN_UP]: 'Sign Up',
  [ERoutes.USER]: 'My Profile',
  [ERoutes.TIMELINE]: 'Timeline',
  [ERoutes.ADMIN_APPROVE_POSTS]: 'Approve Posts',
  [ERoutes.TOS]: 'Terms of Service',
  [ERoutes.PRIVACY_POLICY]: 'Privacy Policy',
  [ERoutes.CONTACT]: 'Contact',
};
