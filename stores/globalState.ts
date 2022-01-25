import { IPost } from '../models/PostModel';
import { IUser } from '../models/UserModel';

export interface IGlobalState {
  user: IUser;
  posts: Array<IPost>;
}
