import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type Image {
    id: String!
    created: String
    service: String
    fileName: String
    url: String!
    alt: String
  }
`;
