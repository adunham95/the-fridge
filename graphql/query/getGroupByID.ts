export const GET_GROUP_BY_ID_QUERY = `
getGroupByID(id:$id){
    id
    orgID
    name
    permissions
  }
`;

export const GET_GROUP_BY_ID = `
query getGroupByID($id:String!){
   ${GET_GROUP_BY_ID_QUERY}
  }
`;
