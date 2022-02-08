export const UPDATE_USER_MUTATION = `
mutation UpdateUser($userInfo:UpdateUserInput!){
    updateUser(input:$userInfo){
      id
      name
      email
    }
  }`;
