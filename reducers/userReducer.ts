import { IStateUser } from "../models/UserModel";

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


export enum USER_ACTION{
    SET_USER = 'setUser'
}

type UserPayload = {
    [USER_ACTION.SET_USER]: {
        user: IStateUser
    }
}

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export function userReducer(state: IStateUser, action: UserActions) {
    switch (action.type) {
        case USER_ACTION.SET_USER:
            return state;
    
        default:
            return state;
    }
  }