import { IOrg } from './OrgModel';
interface IPermissions {
  orgID: string;
  permissions: [EUserPermissions];
}

export interface IUser {
  id: string;
  name: string;
  permissions: Array<IPermissions>;
  orgs: Array<IOrg>;
}

export enum EUserPermissions {
  CAN_POST = 'canPost',
  CAN_POST_W_APPROVAL = 'canPostWithApproval',
}
