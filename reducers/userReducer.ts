import { createSlice } from '@reduxjs/toolkit';
import { EUserPermissions } from '../models/UserModel';

const initialState = {
  id: 'adrian',
  name: 'Adrian Dunham',
  permissions: {
    Adrian: [EUserPermissions.CAN_POST],
    Emelie: [EUserPermissions.CAN_POST_W_APPROVAL],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
