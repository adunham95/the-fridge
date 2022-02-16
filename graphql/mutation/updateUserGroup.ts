export const UPDATE_USER_GROUPS_MUTATION = `
mutation UpdateUsers($users:[UpdateUserGroup!]){
    updateUsersGroup(input:$users){
          success
    }
  }
`;
