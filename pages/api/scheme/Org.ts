import { gql } from 'apollo-server-micro';
import dbConnect from '../../../utils/dbConnect';
import { OrgModel } from '../../../models/OrgModel_Server';

export const typeDef = gql`
  type Org {
    id: String!
    name: String!
    groups: [Group!]
  }

  input OrgInput {
    name: String!
    defaultPostGroups: [String!]
    defaultPostSettings: [String!]
  }

  extend type Query {
    getOrgs: [Org]
  }

  extend type Mutation {
    createOrg(input: OrgInput!): Org!
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
  },
};
