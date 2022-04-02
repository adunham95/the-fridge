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
  email: string;
  created: string;
  username: string;
  orgs: Array<IUserOrg>;
}

export interface IStateUser {
  name: string;
  accountColor?: string;
  email: string;
  username: string;
}

export enum EUserPermissions {
  CAN_POST = 'canPost',
  CAN_COMMENT = 'canComment',
  CAN_SHARE = 'canShare',
  IS_ADMIN = 'isAdmin',
  REQUIRES_POST_APPROVAL = 'requiresPostApproval',
  PRE_POST_APPROVAL = 'prePostApproval',
  CAN_APPROVE_POSTS = 'canApprovePosts',
  UPDATE_GROUPS = 'canUpdateGroup',
  CREATE_GROUPS = 'canCreateGroup',
  CAN_VIEW_POST = 'canViewPost',
  CAN_VIEW_LIKERS = 'canViewLikers',
  CAN_UPDATE_POST = 'canUpdatePost',
}
