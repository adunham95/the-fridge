export const CREATE_GROUP_MUTATION = `mutation CreateGroup($newGroup:GroupInput!) {
    createGroup(input:$newGroup) {
      name
      id
    }}`;
