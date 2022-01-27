import { UserModel } from './../../../models/UserModel_Server';
import dbConnect from '../../../utils/dbConnect';
import { PostModel } from '../../../models/PostModel_Server';
import { CommentModel } from '../../../models/CommentMode_Server';
import { OrgModel } from '../../../models/OrgModel_Server';

const Authors = [
  {
    id: 'Adrian',
    name: 'Adrian Dunham',
  },
  {
    id: 'Emelie',
    name: 'Emelie Dunham',
  },
  {
    id: 'Annabelle',
    name: 'Annabelle Dunham',
  },
];

const orgs = [
  {
    id: 'Adrian',
    orgName: 'Adrian Family',
  },
  {
    id: 'Emelie',
    orgName: 'Emelie Family',
  },
];

export const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        await dbConnect();
        const posts = await PostModel.find().populate('org');
        return posts
          .sort((a, b) => {
            return Date.parse(b.dateTime) - Date.parse(a.dateTime);
          })
          .map((post) => {
            return {
              ...post.toJSON(),
              likedBy: [],
              comments: [],
              postedBy:
                Authors.find((a) => a.id === post.authorID) || Authors[0],
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
          likedBy: [],
          orgName: orgs.find((o) => o.id === post.orgID)?.orgName,
          postedBy: Authors.find((a) => a.id === post.authorID) || Authors[0],
        };
      } catch (error) {
        throw error;
      }
    },
    getUser: async (_: any, args: any) => {
      try {
        await dbConnect();
        const post = await UserModel.findById(args.id).populate('orgs');
        const user = { ...post.toJSON() };
        return user;
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
          authorID: Authors[0].id,
        });
        const newPostFromDB = await newPost.save();
        console.log(newPostFromDB);
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
          authorID: Authors[0].id,
        });
        const newCommentFromDB = await newComment.save();
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
        console.log(newOrg.toJSON());
        return newOrgFromDB;
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
