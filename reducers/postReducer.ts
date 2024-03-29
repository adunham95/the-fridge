import { IComment } from './../models/CommentModel';
import { IPost } from "../models/PostModel";
import { sortByDate } from "../util/reducerHelper";

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
    SET_POSTS = 'setPosts',
    ADD_POST = 'addPost',
    ADD_COMMENT = 'addComment',
    UPDATE_LIKE = 'updateLike'
}

type PostPayload = {
    [POST_ACTION.SET_POSTS]: {
        posts: Array<IPost>;
    }
    [POST_ACTION.ADD_POST]: {
        post: IPost
    },
    [POST_ACTION.ADD_COMMENT]: {
        postID: string,
        comment: IComment
    },
    [POST_ACTION.UPDATE_LIKE]: {
        postID: string,
        userID: string
    }
}

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

export function postReducer(state: Array<IPost>, action: PostActions){
    switch(action.type){
        case POST_ACTION.SET_POSTS:{
            const currentState = [...state, ...action.payload.posts];
            const newState = currentState.filter(function(item, pos) {
                console.log(currentState.indexOf(item) == pos)
                return currentState.indexOf(item) == pos;
            });
            return sortByDate(newState);
        }
        case POST_ACTION.ADD_POST:{
            return sortByDate([...state, action.payload.post])
        }
        case POST_ACTION.ADD_COMMENT: {
            const newState = [...state];
            const postToUpdate = newState.find(p => p.id === action.payload.postID);
            postToUpdate?.comments.push(action.payload.comment)
            return sortByDate(newState)
        }
        case POST_ACTION.UPDATE_LIKE: {
            const newState = [...state];
            const postToUpdate = newState.find(p => p.id === action.payload.postID);
            if(postToUpdate?.likedBy.includes(action.payload.userID)){
                postToUpdate.likedBy = postToUpdate?.likedBy.filter(p => p !== action.payload.userID);
            }
            else{
                postToUpdate?.likedBy.push(action.payload.userID)
            }
            return newState
        }
        default:
            return state
    }
}