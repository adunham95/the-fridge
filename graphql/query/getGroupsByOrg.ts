export const GET_GROUPS_BY_ORG_QUERY = `
getGroupsByOrg(orgIDs:$orgIDs){
    name
    id
    permissions
  }
`;

export const GET_GROUPS_BY_ORG = `
query GetGroupsByOrg($orgIDs:[String!]){
    ${GET_GROUPS_BY_ORG_QUERY}
  }
`;
