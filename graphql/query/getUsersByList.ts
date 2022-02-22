export const GET_USERS_BY_LIST = `
query getUsersByList($ids:[String!]){
    getUsersByList(ids:$ids){
      id
      name
      accountColor
    }
  }
`;
