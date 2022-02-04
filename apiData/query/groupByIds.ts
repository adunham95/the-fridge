export const GROUP_BY_IDS = `
query GetOrgsByIDs($ids: [String!]){
    getOrgsByIDs(orgIDs:$ids){
      id
      name
      groups{
        id
        name
        permissions
      }
      defaultPostGroups
      defaultPostSettings
    }
  }
`;
