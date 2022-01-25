import { createSlice } from '@reduxjs/toolkit';
import { EUserPermissions } from '../models/UserModel';

const initialState = {
  id: 'adrian',
  name: 'Adrian Dunham',
  permissions: {
    Adrian: [EUserPermissions.CAN_POST],
  },
};

const userSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
