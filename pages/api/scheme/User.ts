import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';
import { Types } from 'mongoose';
import { UserModel } from '../auth/models/UserModel_Server';
import bcrypt from 'bcrypt';

export const typeDef = gql`
  type User {
    id: String!
    name: String!
    accountColor: String
    email: String
    orgs: [UserOrgs]
  }

  type UserOrgs {
    org: UserOrg
    group: UserGroup
  }

  type UserGroup {
    id: String
    name: String
    permissions: [String!]
  }

  type UserOrg {
    id: String
    name: String
  }

  input NewUserOrg {
    org: String!
    group: String
  }

  input NewUserInput {
    name: String!
    accountColor: String
    password: String!
    username: String
    email: String!
    orgs: [NewUserOrg]
  }

  input UpdateUserInput {
    id: String!
    name: String
    email: String
    password: String
  }

  extend type Query {
    getUser(id: String!): User!
  }

  extend type Mutation {
    createUser(input: NewUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
  }
`;

export const resolvers = {
  Query: {
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
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      try {
        const hash = bcrypt.hashSync(args.input.password, 10);
        const newUserData = {
          password: hash,
          username: args.input.username,
          email: args.input.email,
          name: args.input.name,
          accountColor: args.input?.accountColor,
          orgs: args.input?.orgs,
        };
        console.log({ newUserData });
        await dbConnect();
        const newUser = new UserModel(newUserData);
        const newUserFromDB = await newUser.save();
        return newUserFromDB;
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (_: any, args: any) => {
      try {
        await dbConnect();
        console.log(args);
        const update: any = {};
        if (args.input?.name) {
          update.name = args.input.name;
        }
        if (args.input?.email) {
          update.email = args.input.email;
        }
        if (args.input?.password) {
          update.password = bcrypt.hashSync(args.input.password, 10);
        }
        console.log(update);
        const updatedUser = UserModel.findByIdAndUpdate(
          new Types.ObjectId(args.input.id),
          update,
          { upsert: true, returnDocument: 'after' },
        );
        return updatedUser;
      } catch (error) {
        throw error;
      }
    },
  },
};
