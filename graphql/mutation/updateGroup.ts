export const UPDATE_ORG_GROUP = `
mutation updateGroup($updatedGroup: UpdateGroupInput!){
    updateGroup(input:$updatedGroup){
      id
      name
      permissions
      orgID
    }
  }
`;
