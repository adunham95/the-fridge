import { createSlice } from '@reduxjs/toolkit';
import { IOrg } from '../models/OrgModel';

const initialState: Array<IOrg> = [
  {
    name: 'Adrians Family',
    id: 'Adrian',
    groupIDs: ['family', 'friends', 'admin'],
  },
  {
    name: 'Emelies Family',
    id: 'Emelie',
    groupIDs: ['family', 'friends', 'admin'],
  },
];

const orgSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {},
});

export default orgSlice.reducer;
