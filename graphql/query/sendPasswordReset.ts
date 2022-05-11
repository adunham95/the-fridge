export const QUERY_RESET_PASSWORD = `
query sendPasswordRequest($email:String!){
    sendPasswordRequest(email:$email){
      success
      msg
    }
  }
`;
