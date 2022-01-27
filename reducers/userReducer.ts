import { createSlice } from '@reduxjs/toolkit';
import { EUserPermissions, IUser } from '../models/UserModel';

const initialState: IUser = {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
