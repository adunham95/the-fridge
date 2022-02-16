import { EUserPermissions } from './UserModel';

interface IUserPermissionDetails {
  [key: string]: {
    title: string,
    description?: string,
  };
}

export const UserPermissionDetails: IUserPermissionDetails = {
  [EUserPermissions.CAN_VIEW_POST]: {
    title: 'View Posts',
    description: 'This group can view posts',
  },
  [EUserPermissions.CAN_POST]: {
    title: 'Can Post',
    description: 'This group can create posts',
  },
  [EUserPermissions.IS_ADMIN]: {
    title: 'Is Admin',
    description:
      'This group has permission to the admin panel, create groups, orgs',
  },
  [EUserPermissions.REQUIRES_POST_APPROVAL]: {
    title: 'Can Post w/ Permission',
    description: 'They can post, but if the posts require approval ',
  },
  [EUserPermissions.CAN_APPROVE_POSTS]: {
    title: 'Can Approve Posts',
    description: 'They can approve posts that require approval',
  },
  [EUserPermissions.CAN_COMMENT]: {
    title: 'Can Comment',
    description: 'This group is allowed to comment',
  },
  [EUserPermissions.CAN_SHARE]: {
    title: 'Can Share',
    description: 'This groups is allowed to share the posts',
  },
  [EUserPermissions.CAN_VIEW_LIKERS]: {
    title: 'Can View Likers',
    description:
      'This group can view who has liked a post. Unselected will just see the number',
  },
};
