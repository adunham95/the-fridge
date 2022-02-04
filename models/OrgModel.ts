export interface IOrg {
  name: string;
  id: string;
  groups?: Array<IGroup>;
  defaultPostGroups?: Array<string>;
  defaultPostSettings?: Array<string>;
}

export interface IGroup {
  id: string;
  name: string;
  permissions: Array<string>;
}
