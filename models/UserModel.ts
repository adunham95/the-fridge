export interface IUser {
  id: string;
  name: string;
  permissions: Record<string, Array<EUserPermissions>>;
}

export enum EUserPermissions {
  CAN_POST = 'canPost',
}
