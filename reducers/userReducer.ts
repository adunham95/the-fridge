import { createSlice } from '@reduxjs/toolkit';
import { EUserPermissions, IUser } from '../models/UserModel';

const initialState: IUser = {
  id: 'adrian',
  name: 'Adrian Dunham',
  permissions: {
    Adrian: [EUserPermissions.CAN_POST],
    Emelie: [EUserPermissions.CAN_POST_W_APPROVAL],
  },
  orgs: {
    Adrian: ['family', 'friends', 'admin'],
    Emelie: ['family', 'friends'],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
