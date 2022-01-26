import dbConnect from '../../../lib/dbConnect';
import { PostModel } from '../../../models/PostModel_Server';

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
        const posts = await PostModel.find();
        return posts.map((post) => {
          return {
            ...post.toJSON(),
            orgName: orgs.find((o) => o.id === post.orgID)?.orgName,
            postedBy: Authors.find((a) => a.id === post.authorID),
          };
        });
      } catch (error) {
        throw error;
      }
    },
    getPost: async (_, args) => {
      try {
        await dbConnect();
        const post = await PostModel.findById(args.id);
        return {
          ...post.toJSON(),
          orgName: orgs.find((o) => o.id === post.orgID)?.orgName,
          postedBy: Authors.find((a) => a.id === post.authorID),
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createPost: async (_, args) => {
      try {
        await dbConnect();
        const newPost = new PostModel({
          ...args.input,
          dateTime: new Date(),
          authorID: Authors[0].id,
        });
        const newPostFromDB = await newPost.save();
        return newPostFromDB;
      } catch (error) {
        throw error;
      }
    },
  },
};
