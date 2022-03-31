import { ApolloError } from 'apollo-server-micro';

export enum EGraphQLErrorCode {
  NO_USER = 'NO_LOGGED_IN',
  BAD_USER = 'BAD_USER',
}

export class GraphQLError extends ApolloError {
  constructor(message: string, errorCode: EGraphQLErrorCode) {
    super(message, errorCode);

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}
