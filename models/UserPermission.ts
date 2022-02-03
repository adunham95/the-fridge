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
    description: 'They have permission to the admin panel, create groups, orgs',
  },
  [EUserPermissions.REQUIRES_POST_APPROVAL]: {
    title: 'Post Permission',
    description: 'The can post, but if the posts require approval '
  },
  [EUserPermissions.CAN_COMMENT]:{
    title: 'Can Comment',
    description: 'This group is allowed to comment'
  },
  [EUserPermissions.CAN_SHARE]:{
    title: 'Can Share',
    description: 'This groups is allowed to share the posts'
  }
};
