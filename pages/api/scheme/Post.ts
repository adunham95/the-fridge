import { PostModel } from './../auth/models/PostModel_Server';
import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';

export const typeDef = gql`
  type WallPost {
    id: String
    dateTime: String
    description: String
    image: String
    org: Org
    postedBy: PostAuthor
    likedBy: [String]
    comments: [String]
    permissions: [String]
  }

  type AdvancedWallPost {
    id: String
    dateTime: String
    description: String
    image: String
    org: Org
    postedBy: PostAuthor
    likedBy: [String]
    comments: [Comment]
    permissions: [String]
  }

  extend type Query {
    getPostsByGroup(groupIDs: [String!]): [WallPost!]
  }
`;

export const resolvers = {
  Query: {
    getPostsByGroup: async (_: any, args: any) => {
      const groupList = args.groupIDs;
      console.log(groupList);
      try {
        await dbConnect();
        const posts = await PostModel.find({
          viewByGroups: {
            $in: groupList,
          },
        }).populate(['org', 'postedBy']);

        console.log('posts', posts);

        return posts
          .sort((a, b) => {
            return Date.parse(b.dateTime) - Date.parse(a.dateTime);
          })
          .map((post) => post.toJSON());
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {},
};
