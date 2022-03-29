import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';
import { OrgModel } from '../auth/models/OrgModel_Server';
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
    getOrgsByIDs(orgIDs: [String!]): [Org!]
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
    getOrgsByIDs: async (_: any, args: any) => {
      try {
        console.log(args.orgIDs);
        const idList = args.orgIDs.map((id: string) => new Types.ObjectId(id));
        await dbConnect();
        console.log(idList);
        const orgs = await OrgModel.find({
          _id: idList,
        }).populate({
          path: 'groups',
        });
        console.log(orgs);
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
          new Types.ObjectId(args.input.id),
          update,
          { upsert: true, returnDocument: 'after' },
        );
        return updatedOrg;
      } catch (error) {
        throw error;
      }
    },
  },
};
