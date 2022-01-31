import { gql } from 'apollo-server-micro';
import { typeDef as GroupDef } from '../scheme/Group';

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
    viewByGroups: [String]
    postedBy: PostAuthor
    likedBy: [String]
    comments: [Comment]
    permissions: [String]
  }

  input PostInput {
    description: String
    image: String
    org: String
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
    author: CommentAuthor
  }

  type CommentAuthor {
    id: String
    name: String
  }

  type Org {
    id: String!
    name: String!
    groups: [Group!]
  }

  type UserPermissions {
    orgId: String!
    permissions: [String!]
  }

  type UserOrgs {
    org: UserOrg
    group: UserGroup
  }

  type UserGroup {
    id: String
    name: String
    permissions: [String!]
  }

  type UserOrg {
    id: String
    name: String
  }

  type User {
    id: String!
    name: String!
    accountColor: String
    permissions: [UserPermissions]
    orgs: [UserOrgs]
  }

  input CommentInput {
    message: String
    postID: String
    parentComment: String
  }

  input OrgInput {
    name: String!
  }

  input UserInput {
    name: String!
    accountColor: String
    orgs: [String!]
  }

  type updateResponse {
    success: Boolean
  }

  type Query {
    update: updateResponse
    getPosts: [Post]
    getPost(id: String!): Post!
    getUser(id: String!): User!
    getOrgs: [Org]
  }

  type Mutation {
    createPost(input: PostInput): Post!
    createComment(input: CommentInput!): Comment!
    createOrg(input: OrgInput!): Org!
    createUser(input: UserInput!): User!
  }
`;

export default [typeDefs, GroupDef];
