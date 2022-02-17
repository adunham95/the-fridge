import { IComment } from './CommentModel';

export interface IPost {
  id: string;
  dateTime: string;
  description?: string;
  image?: Array<string>;
  orgID: string;
  orgName?: string;
  viewByGroups?: Array<string>;
  postedBy: IPostAuthor;
  likedBy: Array<string>;
  comments: Array<IComment>;
  permissions: Array<EPostPermission>;
}

interface IPostAuthor {
  id: string;
  name: string;
  accountColor?: string;
}

export enum EPostPermission {
  ALLOW_SHARE = 'allowShare',
  DISALLOW_COMMENT = 'disallowComment',
  IS_PUBLIC = 'PublicPost',
}
