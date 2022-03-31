import { EGraphQLErrorCode, GraphQLError } from './graphqlError';

function checkIfLoggedIn(context: any) {
  if (!context?.user?.id) {
    throw new GraphQLError(
      'Cannot view if not loggedin',
      EGraphQLErrorCode.BAD_USER,
    );
    return true;
  } else {
    console.log('logged in');
    return true;
  }
}

export default checkIfLoggedIn;
