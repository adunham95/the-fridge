import { PostModel } from './../auth/models/PostModel_Server';
import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';
import { Types } from 'mongoose';

export const typeDef = gql`
  type WallPost {
    id: String
    dateTime: String
    description: String
    image: [String]
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
    image: [String]
    org: Org
    postedBy: PostAuthor
    likedBy: [String]
    comments: [Comment]
    permissions: [String]
  }

  input PostInput {
    description: String
    image: [String]
    org: String
    postedBy: String
    viewByGroups: [String]
  }

  extend type Query {
    getPostsByGroup(groupIDs: [String!]): [WallPost!]
    getSinglePost(id: String!): AdvancedWallPost
  }

  extend type Mutation {
    createPost(input: PostInput): WallPost!
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
    getSinglePost: async (_: any, args: any) => {
      try {
        console.log(args.id);
        await dbConnect();
        const post = await PostModel.findById(
          new Types.ObjectId(args.id),
        ).populate(['org', 'postedBy', 'comments']);
        return post.toJSON();
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createPost: async (_: any, args: any) => {
      try {
        await dbConnect();
        const newPost = new PostModel({
          ...args.input,
          dateTime: new Date(),
        });
        const newPostFromDB = await newPost.save();
        const returnPost = await new PostModel(newPostFromDB).populate([
          'org',
          'postedBy',
        ]);
        console.log(returnPost);
        return returnPost.toJSON();
      } catch (error) {
        throw error;
      }
    },
  },
};
