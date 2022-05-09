export const VALIDATE_EMAIL_MUTATION = `
mutation validateEmail($validationString:String!){
    validateEmail(validationString:$validationString){
      success
    }
  }
`;
