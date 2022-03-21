// @flow
import * as React from 'react';
import { IPost } from '../../models/PostModel';

const ALL_GROUPS_QUERY = `
query GetGroupsByOrg($orgIDs:[String!]){
  getGroupsByOrg(orgIDs:$orgIDs){
    id
    name
    permissions
    orgID
  }
  getOrgsByIDs(orgIDs:$orgIDs){
    id
    defaultPostGroups
    defaultPostSettings
  }
}
`;

type Props = {
  id: string,
  viewByGroups: Array<string>,
};

export function EditPost(props: Props) {
  console.log(props);
  return <div></div>;
}
