export interface IOrg {
  name: string;
  id: string;
  groupIDs: Array<string>;
  groups?: Array<IGroup>;
}

export interface IGroup {
  id: string;
  userIDs: Array<string>;
}
