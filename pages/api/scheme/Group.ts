import { GroupModel } from '../auth/models/GroupModel_server';
import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';
import mongoose from 'mongoose';
import { OrgModel } from '../auth/models/OrgModel_Server';
import checkIfLoggedIn from '../utils/checkIfUser';

export const typeDef = gql`
  input GroupInput {
    name: String!
    orgID: String!
    permissions: [String!]
  }

  type Group {
    id: String!
    name: String!
    orgID: String!
    permissions: [String!]
  }

  input UpdateGroupInput {
    id: String!
    name: String
    permissions: [String]
  }

  extend type Query {
    getGroupsByOrg(orgIDs: [String!]): [Group!]
    getGroupByID(id: String): Group!
  }

  extend type Mutation {
    createGroup(input: GroupInput!): Group!
    updateGroup(input: UpdateGroupInput!): Group!
  }
`;

export const resolvers = {
  Query: {
    getGroupsByOrg: async (_: any, args: any, context: any) => {
      try {
        checkIfLoggedIn(context);
        const idList = args.orgIDs.map(
          (id: string) => new mongoose.Types.ObjectId(id),
        );
        console.log(idList);
        await dbConnect();
        const groups = await GroupModel.find({
          orgID: {
            $in: idList,
          },
        });
        console.log(groups);
        return groups.map((group) => {
          return group.toJSON();
        });
      } catch (error) {
        throw error;
      }
    },
    getGroupByID: async (_: any, args: any, context: any) => {
      try {
        checkIfLoggedIn(context);
        await dbConnect();
        const group = await GroupModel.findById({
          _id: new mongoose.Types.ObjectId(args.id),
        });
        console.log(group);
        return { ...group.toJSON() };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createGroup: async (_: any, args: any, context: any) => {
      try {
        checkIfLoggedIn(context);
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
    updateGroup: async (_: any, args: any, context: any) => {
      const update: any = {};
      if (args.input?.name) {
        update.name = args.input.name;
      }
      if (args.input?.permissions) {
        update.permissions = args.input.permissions;
      }
      try {
        checkIfLoggedIn(context);
        await dbConnect();
        const updatedGroup = GroupModel.findByIdAndUpdate(
          new mongoose.Types.ObjectId(args.input.id),
          update,
          { upsert: true, returnDocument: 'after' },
        );
        return updatedGroup;
      } catch (error) {
        throw error;
      }
    },
  },
};
