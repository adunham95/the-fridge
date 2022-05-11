import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  input ContactInput {
    name: String
    email: String
    message: String
  }

  extend type Mutation {
    sendContact(input: Contact!): Success!
  }
`;

export const resolvers = {
  Mutation: {
    sendContact: async (_: any, args: any) => {
      try {
        return '';
      } catch (error) {
        throw error;
      }
    },
  },
};
