import { IOrg } from '../models/OrgModel';

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

export enum ORG_ACTION {
  SET_ORGS = 'SET_ORGS',
}

type OrgPayload = {
  [ORG_ACTION.SET_ORGS] : {
    id: string;
  }
}

export type OrgActions = ActionMap<OrgPayload>[keyof ActionMap<OrgPayload>];

export function orgReducer(state: Array<IOrg>, action: OrgActions) {
  switch (action.type) {
    case ORG_ACTION.SET_ORGS:
      return { ...state, orgs: action.payload };
    default:
      return state;
  }
}
