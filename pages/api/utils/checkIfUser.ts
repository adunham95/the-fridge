import { EGraphQLErrorCode, GraphQLError } from './graphqlError';

function checkIfLoggedIn(context: any) {
  if (!context?.user?.id) {
    throw new GraphQLError(
      'Cannot view if not loggedin',
      EGraphQLErrorCode.BAD_USER,
    );
  } else {
    console.log('logged in');
    return true;
  }
}

const arrayCompare = (arr: Array<string>, target: Array<string>) =>
  target.every((v: any) => arr.includes(v));

function checkIfPermission(
  context: any,
  org: string,
  permissions: Array<string>,
) {
  const orgForPost = context.user.orgs.find((o: any) => o.org.id === org);

  console.log('orgForPost', orgForPost);

  if (!arrayCompare(orgForPost.group.permissions, permissions)) {
    throw new GraphQLError(
      'Does not have correct permissions',
      EGraphQLErrorCode.NO_PERMISSION,
    );
  } else {
    console.log('logged in');
    return true;
  }
}

export default checkIfLoggedIn;

export { checkIfPermission };
