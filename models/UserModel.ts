export interface IUser {
  id: string;
  name: string;
  permissions: Record<string, Array<EUserPermissions>>;
  orgs: Record<string, Array<string>>;
}

export enum EUserPermissions {
  CAN_POST = 'canPost',
  CAN_POST_W_APPROVAL = 'canPostWithApproval',
}
