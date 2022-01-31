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
  IS_ADMIN = 'isAdmin',
}
