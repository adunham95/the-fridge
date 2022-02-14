export const GET_GROUPS_BY_ORG_QUERY = `
getGroupsByOrg(orgIDs:$orgIDs){
    name
    id
  }
`;

export const GET_GROUPS_BY_ORG = `
query GetGroupsByOrg($orgIDs:[String!]){
    getGroupsByOrg(orgIDs:$orgIDs){
      name
      id
    }
  }
`;
