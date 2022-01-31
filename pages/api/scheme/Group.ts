import { GroupModel } from './../../../models/GroupModel_server';
import { gql } from 'apollo-server-micro';
import dbConnect from '../../../utils/dbConnect';
import mongoose from 'mongoose';

export const typeDef = gql`
  input GroupInput {
    name: String!
    orgID: String!
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
        console.log(args.orgIDs);
        const idList = args.orgIDs.map(
          (id: string) => new mongoose.Types.ObjectId(id),
        );
        console.log(idList);
        await dbConnect();
        const groups = await GroupModel.find({
          orgID: idList,
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
};
