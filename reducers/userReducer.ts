import { EUserPermissions, IUser } from '../models/UserModel';

export const initialUserState: IUser = {
  id: '61f28b404956e23fa1c4534e',
  name: 'Adrian Dunham',
  permissions: {
    '61f28acf4956e23fa1c4534c': [EUserPermissions.CAN_POST],
    '61f28df14956e23fa1c45352': [EUserPermissions.CAN_POST_W_APPROVAL],
  },
  orgs: {
    Adrian: ['family', 'friends', 'admin'],
    Emelie: ['family', 'friends'],
  },
};

export enum USER_ACTION {
  LOGGED_IN_USER = 'LOGGED_IN_USER',
}

export function userReducer(state: any, action: any) {
  switch (action.type) {
    case USER_ACTION.LOGGED_IN_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
