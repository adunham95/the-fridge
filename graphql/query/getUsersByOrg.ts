export const GET_USERS_BY_ORG_QUERY = `
getUsersByOrg(orgIDs:$orgIDs){
    id
    name
   email 
    orgs{
      org{
            id
      name}
      group{
        id
        name
      }
    }
  }
`;

export const GET_USERS_BY_ORG = `
query GetUsersByOrgID($orgIDs:[String!]){
    getUsersByOrg(orgIDs:$orgIDs){
      id
      name
     email 
      orgs{
        org{
              id
        name}
        group{
          id
          name
        }
      }
    }
  }`;
