import { gql } from 'apollo-server-micro';
import dbConnect from '../../../utils/dbConnect';
import { OrgModel } from '../../../models/OrgModel_Server';
import { Types } from 'mongoose';

export const typeDef = gql`
  type Org {
    id: String!
    name: String!
    groups: [Group!]
    defaultPostGroups: [String!]
    defaultPostSettings: [String!]
  }

  input OrgInput {
    name: String!
    defaultPostGroups: [String!]
    defaultPostSettings: [String!]
  }

  input UpdateOrgInput {
    id: String!
    name: String
    defaultPostGroups: [String!]
    defaultPostSettings: [String!]
  }

  extend type Query {
    getOrgs: [Org]
  }

  extend type Mutation {
    createOrg(input: OrgInput!): Org!
    updateOrg(input: UpdateOrgInput): Org!
  }
`;

export const resolvers = {
  Query: {
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
    updateOrg: async (_: any, args: any) => {
      try {
        await dbConnect();
        console.log(args);
        const update: any = {};
        if (args.input?.name) {
          update.name = args.input.name;
        }
        if (args.input?.defaultPostGroups) {
          update.defaultPostGroups = args.input.defaultPostGroups;
        }
        if (args.input?.defaultPostSettings) {
          update.defaultPostSettings = args.input.defaultPostSettings;
        }
        console.log(update);
        const updatedOrg = OrgModel.findByIdAndUpdate(
          Types.ObjectId(args.input.id),
          update,
          { upsert: true, returnDocument: 'after' },
        );
        console.log(updatedOrg);
        return updatedOrg;
      } catch (error) {
        throw error;
      }
    },
  },
};
