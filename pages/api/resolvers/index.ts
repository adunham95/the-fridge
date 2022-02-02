import { GroupModel } from '../auth/models/GroupModel_server';
import { UserModel } from '../auth/models/UserModel_Server';
import dbConnect from '../../../utils/dbConnect';
import { PostModel } from '../auth/models/PostModel_Server';
import { CommentModel } from '../auth/models/CommentMode_Server';
import { OrgModel } from '../auth/models/OrgModel_Server';
import { merge } from 'lodash';

import { resolvers as GroupResolvers } from '../scheme/Group';
import { resolvers as OrgResolvers } from '../scheme/Org';
import { resolvers as UserResolvers } from '../scheme/User';

const defaultResolvers = {
  Query: {
    update: async () => {
      try {
        PostModel.updateMany(
          { enabled: { $exists: false } },
          { enabled: false },
        );
        CommentModel.updateMany(
          { enabled: { $exists: false } },
          { enabled: false },
        );
        UserModel.updateMany(
          { enabled: { $exists: false } },
          { enabled: false },
        );
        OrgModel.updateMany(
          { enabled: { $exists: false } },
          { enabled: false },
        );
        GroupModel.updateMany(
          { enabled: { $exists: false } },
          { enabled: false },
        );
        console.log('Updated complete');
        return { success: true };
      } catch (error) {
        throw error;
      }
    },
    getPosts: async () => {
      try {
        await dbConnect();
        const posts = await PostModel.find()
          .populate(['org', 'postedBy'])
          .populate({
            path: 'comments', // 1st level subdoc (get comments)
            populate: ['author'],
          });
        return posts
          .sort((a, b) => {
            return Date.parse(b.dateTime) - Date.parse(a.dateTime);
          })
          .map((post) => {
            return {
              ...post.toJSON(),
              likedBy: [],
            };
          });
      } catch (error) {
        throw error;
      }
    },
    getPost: async (_: any, args: any) => {
      try {
        await dbConnect();
        const post = await PostModel.findById(args.id);
        return {
          ...post.toJSON(),
        };
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
        return newPostFromDB;
      } catch (error) {
        throw error;
      }
    },
    createComment: async (_: any, args: any) => {
      try {
        await dbConnect();
        const newComment = new CommentModel({
          ...args.input,
          dateTime: new Date(),
        });
        const newCommentFromDB = await newComment.save();

        const res = await PostModel.updateOne(
          { _id: args.input.postID },
          { $push: { comments: newCommentFromDB.id } },
        );

        return newCommentFromDB;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default merge(
  defaultResolvers,
  GroupResolvers,
  OrgResolvers,
  UserResolvers,
);
