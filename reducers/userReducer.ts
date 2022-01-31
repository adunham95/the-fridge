import { IUser } from '../models/UserModel';


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

export const initialUserState: IUser = {
  id: 'test',
  name: 'Test User',
  orgs: [],
};

export enum USER_ACTION {
  SET_USER = 'SET_USER',
}

type UserPayload = {
  [USER_ACTION.SET_USER] : {
    user: IUser;
  }
}


export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export function userReducer(state: IUser, action: UserActions) {
  switch (action.type) {
    case USER_ACTION.SET_USER:
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
}
