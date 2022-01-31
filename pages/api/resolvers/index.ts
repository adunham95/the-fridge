import { GroupModel } from './../../../models/GroupModel_server';
import { UserModel } from './../../../models/UserModel_Server';
import dbConnect from '../../../utils/dbConnect';
import { PostModel } from '../../../models/PostModel_Server';
import { CommentModel } from '../../../models/CommentMode_Server';
import { OrgModel } from '../../../models/OrgModel_Server';
import { merge } from 'lodash';

import { resolvers as GroupResolvers } from '../scheme/Group';

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
    getUser: async (_: any, args: any) => {
      try {
        await dbConnect();
        const post = await UserModel.findById(args.id).populate({
          path: 'orgs', // 1st level subdoc (get comments)
          populate: ['group', 'org'],
        });
        const user = { ...post.toJSON() };
        console.log(user);
        const returnUser = {
          ...user,
          permissions: user.orgs.map(
            (o: { org: { id: string }, group: { permissions: string[] } }) => {
              return {
                orgId: o.org.id,
                permissions: o.group?.permissions || [],
              };
            },
          ),
        };
        console.log(returnUser);
        return returnUser;
      } catch (error) {
        throw error;
      }
    },
    getOrgs: async () => {
      try {
        await dbConnect();
        const orgs = await OrgModel.find();
        return orgs.map((org) => {
          return org.toJSON();
        });
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
    createOrg: async (_: any, args: any) => {
      try {
        await dbConnect();
        const newOrg = new OrgModel({
          ...args.input,
        });
        const newOrgFromDB = await newOrg.save();
        return newOrgFromDB;
      } catch (error) {
        throw error;
      }
    },
    createGroup: async (_: any, args: any) => {
      try {
        await dbConnect();
        const newGroup = new GroupModel({
          ...args.input,
        });
        const newGroupFromDB = await newGroup.save();

        const res = await OrgModel.updateOne(
          { _id: args.input.orgID },
          { $push: { groups: newGroupFromDB.id } },
        );

        return newGroupFromDB;
      } catch (error) {
        throw error;
      }
    },
    createUser: async (_: any, args: any) => {
      try {
        await dbConnect();
        const newUser = new UserModel({
          ...args.input,
        });
        const newUserFromDB = await newUser.save();
        return newUserFromDB;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default merge(defaultResolvers, GroupResolvers);
