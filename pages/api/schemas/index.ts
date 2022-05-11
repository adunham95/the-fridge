import { gql } from 'apollo-server-micro';
import { typeDef as GroupDef } from '../scheme/Group';
import { typeDef as OrgDef } from '../scheme/Org';
import { typeDef as UserDef } from '../scheme/User';
import { typeDef as PostDef } from '../scheme/Post';
import { typeDef as ImageDef } from '../scheme/Image';
import { typeDef as UtilityDef } from '../scheme/Utility';

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Post {
    id: String
    dateTime: String
    description: String
    image: [Image]
    org: Org
    orgID: String
    orgName: String
    postedBy: PostAuthor
    likedBy: [String]
    comments: [Comment]
    permissions: [String]
  }

  type PostAuthor {
    id: String
    name: String
    accountColor: String
  }

  type Success {
    success: Boolean
    msg: String
  }

  type Query {
    update: Success
    getPosts: [Post]
    getPost(id: String!): Post!
  }
`;

export default [
  typeDefs,
  GroupDef,
  OrgDef,
  UserDef,
  PostDef,
  ImageDef,
  UtilityDef,
];
