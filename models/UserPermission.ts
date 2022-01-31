import { EUserPermissions } from './UserModel';

interface IUserPermissionDetails {
  [key: string]: {
    title: string,
    description?: string,
  };
}

export const UserPermissionDetails: IUserPermissionDetails = {
  [EUserPermissions.CAN_POST]: {
    title: 'Can Post',
    description: 'The user in this group can create posts',
  },
  [EUserPermissions.IS_ADMIN]: {
    title: 'Is Admin',
    description:
      " 'They have permission to the admin panel, create groups, orgs'",
  },
};
