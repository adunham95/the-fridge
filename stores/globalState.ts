import { IOrg } from '../models/OrgModel';
import { IPost } from '../models/PostModel';
import { IUser } from '../models/UserModel';

export interface IGlobalState {
  user: IUser;
  posts: Array<IPost>;
  orgs: Array<IOrg>;
}
