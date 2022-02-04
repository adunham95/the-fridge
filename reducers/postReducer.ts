import { IPost } from "../models/PostModel";

// eslint-disable-next-line prettier/prettier
type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
  };

export enum POST_ACTION{
    SET_POSTS = 'setPosts'
}

type PostPayload = {
    [POST_ACTION.SET_POSTS]: {
        posts: Array<IPost>;
    }
}

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

export function postReducer(state: Array<IPost>, action: PostActions){
    switch(action.type){
        case POST_ACTION.SET_POSTS:
            return {...state, ...action.payload.posts}
        default:
            return state
    }
}