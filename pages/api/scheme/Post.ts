import { PostModel } from './../auth/models/PostModel_Server';
import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';
import { Types } from 'mongoose';
import { CommentModel } from '../auth/models/CommentMode_Server';
import { getMonths } from '../utils/date';
import { UserModel } from '../auth/models/UserModel_Server';

export const typeDef = gql`
  type WallPost {
    id: String
    dateTime: String
    updatedAt: String
    edited: Boolean
    description: String
    image: [Image]
    org: Org
    postedBy: PostAuthor
    likedBy: [String]
    comments: [String]
    permissions: [String]
    viewByGroups: [String]
  }

  type AdvancedWallPost {
    id: String
    dateTime: String
    description: String
    updatedAt: String
    edited: Boolean
    image: [Image]
    org: Org
    postedBy: PostAuthor
    likedBy: [String]
    comments: [Comment]
    permissions: [String]
    viewByGroups: [String]
  }

  type ApprovalWallPost {
    id: String
    dateTime: String
    updatedAt: String
    edited: Boolean
    description: String
    image: [Image]
    org: Org
    postedBy: PostAuthor
    likedBy: [String]
    comments: [String]
    permissions: [String]
    viewByGroups: [String]
    approved: String
  }

  input PostInput {
    description: String
    image: [String]
    org: String
    postedBy: String
    viewByGroups: [String]
    permissions: [String]
  }

  input UpdatePostInput {
    description: String
    image: [String]
    org: String
    postedBy: String
    viewByGroups: [String]
    permissions: [String]
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
    accountColor: String
  }

  input CommentInput {
    message: String!
    postID: String!
    parentComment: String
    author: String!
  }

  input UpdateLikeInput {
    postID: String!
    userID: String!
    action: String!
  }

  type UpdateLikeResponse {
    success: Boolean!
  }

  type MonthResponse {
    month: String!
    year: String!
  }

  input PostsToApproval {
    id: String!
    value: String!
  }

  extend type Query {
    getPostsByGroup(
      groupIDs: [String!]
      skip: Float
      limit: Float
      startDate: String
      endDate: String
    ): [WallPost!]
    getPostsForApproval(userID: String): [ApprovalWallPost]
    getSinglePost(id: String!): AdvancedWallPost
    getCommentsByPost(id: String!): [Comment]
    getPostTimeline(groupIDs: [String!]): [MonthResponse]
  }

  extend type Mutation {
    createPost(input: PostInput): WallPost!
    updatePost(id: String!, input: UpdatePostInput): WallPost!
    setPostApprovals(posts: [PostsToApproval]): UpdateLikeResponse
    createComment(input: CommentInput!): Comment!
    updateLike(input: UpdateLikeInput!): UpdateLikeResponse
  }
`;

interface IPagination {
  skip?: number;
  sort: string;
  limit?: number;
}

interface IQuery {
  approved?: string;
  viewByGroups?: object;
  dateTime?: object;
  org?: object;
  _id?: object;
}

export const resolvers = {
  Query: {
    getPostsByGroup: async (_: any, args: any) => {
      // console.log(args);
      const groupList = args.groupIDs;
      // console.log(groupList);
      try {
        await dbConnect();
        let pagination: IPagination = { sort: '-dateTime' };
        let query: IQuery = {
          approved: 'approved',
          viewByGroups: {
            $in: groupList,
          },
        };
        if (args?.limit > 0) {
          console.log({ skip: args.skip || 0, limit: args.limit });
          pagination = {
            sort: '-dateTime',
            skip: args.skip || 0,
            limit: args.limit,
          };
        }
        if (args.startDate && args.endDate) {
          query = {
            ...query,
            dateTime: {
              $gte: new Date(args.startDate).toISOString(),
              $lt: new Date(args.endDate).toISOString(),
            },
          };
        }
        console.log(query);
        console.log(pagination);
        const posts = await PostModel.find(query, null, pagination).populate([
          'org',
          'postedBy',
          'image',
        ]);

        console.log('posts', posts);

        return posts
          .sort((a, b) => {
            return Date.parse(b.dateTime) - Date.parse(a.dateTime);
          })
          .map((post) => {
            return {
              ...post.toJSON(),
              dateTime: new Date(post.dateTime).toUTCString(),
            };
          });
      } catch (error) {
        throw error;
      }
    },
    getPostsForApproval: async (_: any, args: any) => {
      try {
        await dbConnect();
        const user = await UserModel.findById(
          new Types.ObjectId(args.userID),
        ).populate({
          path: 'orgs',
          populate: ['group', 'org'],
        });

        const userOrgsWithApprovalPermission = user.orgs
          .filter((o: any) => {
            return o?.group.permissions.includes('canApprovePosts');
          })
          .map((o: any) => new Types.ObjectId(o.org.id));

        const postQuery: IQuery = {
          approved: 'waiting-approval',
          org: {
            $in: userOrgsWithApprovalPermission,
          },
        };

        const posts = await PostModel.find(postQuery, null).populate([
          'org',
          'postedBy',
          'image',
        ]);

        console.log(posts);

        return posts
          .sort((a, b) => {
            return Date.parse(b.dateTime) - Date.parse(a.dateTime);
          })
          .map((post) => {
            return {
              ...post.toJSON(),
              dateTime: new Date(post.dateTime).toUTCString(),
            };
          });
      } catch (error) {
        throw error;
      }
    },
    getSinglePost: async (_: any, args: any) => {
      try {
        console.log(args.id);
        await dbConnect();
        const post = await PostModel.findById(new Types.ObjectId(args.id))
          .populate({
            path: 'comments', // 1st level subdoc (get comments)
            populate: ['author'],
          })
          .populate(['org', 'postedBy', 'image']);

        console.log(post);

        return {
          ...post.toJSON(),
          dateTime: new Date(post.dateTime).toUTCString(),
        };
      } catch (error) {
        throw error;
      }
    },
    getCommentsByPost: async (_: any, args: any) => {
      console.log(args);
      try {
        await dbConnect();
        const comments = CommentModel.find({
          postID: args.id,
        }).populate(['author']);
        return comments;
      } catch (error) {
        throw error;
      }
    },
    getPostTimeline: async (_: any, args: any) => {
      const groupList = args.groupIDs;
      let months: Array<{ month: number, year: number }> = [];
      try {
        await dbConnect();
        const posts = await PostModel.find({
          viewByGroups: {
            $in: groupList,
          },
        })
          .sort({ date_time: 1 })
          .limit(1);
        // console.log(posts);
        if (posts.length > 0) {
          console.log(posts[0]);
          const postDate = new Date(posts[0].dateTime);
          const currentDate = new Date();
          months = getMonths(postDate, currentDate);
        }
        return months;
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
          'image',
        ]);
        // console.log(returnPost);
        return returnPost.toJSON();
      } catch (error) {
        throw error;
      }
    },
    updatePost: async (_: any, args: any) => {
      try {
        await dbConnect();
        const filter = { _id: args.id };
        const update = { ...args.input, updatedAt: new Date() };
        if (args.input?.description || args.input?.image) {
          update.edited = true;
        }

        console.log(update);
        const doc = await PostModel.findOneAndUpdate(filter, update, {
          new: true,
        });
        const updatedPost = await doc.populate(['org', 'postedBy', 'image']);

        return updatedPost.toJSON();
      } catch (error) {
        throw error;
      }
    },
    setPostApprovals: async (_: any, args: any) => {
      try {
        await dbConnect();

        const bulkOps = args.posts.map((p: any) => ({
          updateOne: {
            filter: { _id: new Types.ObjectId(p.id) },
            update: {
              approved: p.value,
            },
            upsert: true,
          },
        }));

        const data = await PostModel.bulkWrite(bulkOps);

        console.log(data);

        return {
          success: true,
        };
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

        const returnComment = await new CommentModel(newCommentFromDB).populate(
          ['author'],
        );

        return returnComment.toJSON();
      } catch (error) {
        throw error;
      }
    },
    updateLike: async (_: any, args: any) => {
      console.log(args);
      try {
        await dbConnect();
        let action = '$pull';
        if (args.input.action === 'add') {
          action = '$push';
        }
        const res = await PostModel.updateOne(
          { _id: args.input.postID },
          { [action]: { likedBy: args.input.userID } },
        );
        return {
          success: res.modifiedCount > 0,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
