import { gql } from 'apollo-server-micro';
import { typeDef as GroupDef } from '../scheme/Group';
import { typeDef as OrgDef } from '../scheme/Org';
import { typeDef as UserDef } from '../scheme/User';
import { typeDef as PostDef } from '../scheme/Post';

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
    image: String
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
  }

  type Comment {
    id: String
    message: String
    dateTime: String
    postID: String
    parentComment: String
    author: CommentAuthor
  }

  type CommentAuthor {
    id: String
    name: String
  }

  input CommentInput {
    message: String
    postID: String
    parentComment: String
  }

  type updateResponse {
    success: Boolean
  }

  type Query {
    update: updateResponse
    getPosts: [Post]
    getPost(id: String!): Post!
  }

  type Mutation {
    createComment(input: CommentInput!): Comment!
  }
`;

export default [typeDefs, GroupDef, OrgDef, UserDef, PostDef];
