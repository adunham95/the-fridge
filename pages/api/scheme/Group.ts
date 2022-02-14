import { GroupModel } from '../auth/models/GroupModel_server';
import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';
import mongoose from 'mongoose';
import { OrgModel } from '../auth/models/OrgModel_Server';

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

  extend type Query {
    getGroupsByOrg(orgIDs: [String!]): [Group!]
  }

  extend type Mutation {
    createGroup(input: GroupInput!): Group!
  }
`;

export const resolvers = {
  Query: {
    getGroupsByOrg: async (_: any, args: any) => {
      try {
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
  },
  Mutation: {
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
  },
};
