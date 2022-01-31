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
  orgs: Array<IUserOrg>;
}

export enum EUserPermissions {
  CAN_POST = 'canPost',
  CAN_POST_W_APPROVAL = 'canPostWithApproval',
  IS_ADMIN = 'isAdmin',
}
