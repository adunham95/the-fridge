import { IComment } from './CommentModel';
import { IUser } from './UserModel';

export interface IPost {
  id: string;
  dateTime: string;
  description?: string;
  image?: string;
  postedBy: IUser;
  likedBy: Array<string>;
  comments: Array<IComment>;
  permissions: Array<EPostPermission>;
}

export enum EPostPermission {
  ALLOW_SHARE = 'allowShare',
  ALLOW_COMMENT = 'allowComment',
}
