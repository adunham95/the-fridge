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

  type Query {
    getPosts: [Post]
    getPost(id: String!): Post!
  }
`;
