import { IComment } from './CommentModel';
import { IImage } from './IImage';

export interface IPost {
  id: string;
  dateTime: string;
  updatedAt?: string;
  edited?: boolean;
  description?: string;
  image?: Array<IImage>;
  orgID: string;
  orgName?: string;
  viewByGroups?: Array<string>;
  postedBy: IPostAuthor;
  likedBy: Array<string>;
  comments: Array<IComment>;
  permissions: Array<EPostPermission>;
  org: {
    id: string,
  };
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
