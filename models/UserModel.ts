export interface IUser {
  id: string;
  name: string;
  permissions: Array<EUserPermissions>;
}

export enum EUserPermissions {
  CAN_POST = 'canPost',
}
