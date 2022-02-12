export const UPDATE_ORG_MUTATION = `
mutation UpdateOrg($updateOrg:UpdateOrgInput!) {
    updateOrg(input:$updateOrg) {
      name
      id
      defaultPostGroups
      defaultPostSettings
    }
}
`;
