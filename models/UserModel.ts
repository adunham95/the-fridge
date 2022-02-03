interface IUserOrg {
  org: {
    id: string,
    name: string,
  };
  group: {
    id: string,
    name: string,
    permissions: [EUserPermissions],
  };
}

export interface IUser {
  id: string;
  name: string;
  accountColor?: string;
  orgs: Array<IUserOrg>;
}

export enum EUserPermissions {
  CAN_POST = 'canPost',
  CAN_COMMENT='canComment',
  CAN_SHARE='canShare',
  IS_ADMIN = 'isAdmin',
  REQUIRES_POST_APPROVAL = 'requiresPostApprovl',
  APPROVE_POST = 'canApprovePost',
  UPDATE_GROUPS='canUpdateGroup"
  CREATE_GROUPS='canCreateGroup'
}