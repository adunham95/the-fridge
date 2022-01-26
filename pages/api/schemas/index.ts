import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Post {
    id: String
    dateTime: String
    description: String
    image: String
    orgID: String
    orgName: String
    viewByGroups: [String]
    postedBy: PostAuthor
    likedBy: [String]
    comments: [Comment]
    permissions: [String]
  }

  input PostInput {
    description: String
    image: String
    orgID: String
    postedBy: String
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
    commentAuthor: CommentAuthor
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

  type Query {
    getPosts: [Post]
    getPost(id: String!): Post!
  }
  type Mutation {
    createPost(input: PostInput): Post!
    createComment(input: CommentInput!): Comment!
  }
`;
