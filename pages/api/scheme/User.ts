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
    accountColor: String
  }

  input UpdateUserGroup {
    userID: String!
    groupID: String!
    orgID: String!
  }

  type Success {
    success: Boolean
  }

  extend type Query {
    getUser(id: String!): User!
    getUsersByList(ids: [String!]): [User!]
    getUsersByOrg(orgIDs: [String!]): [User!]
  }

  extend type Mutation {
    createUser(input: NewUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    updateUsersGroup(input: [UpdateUserGroup!]): Success!
  }
`;

interface IUpdateUserGroup {
  userID: string;
  groupID: string;
  orgID: string;
}

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
    getUsersByList: async (_: any, args: any) => {
      try {
        const idList = args.ids.map((id: string) => new Types.ObjectId(id));
        console.log(idList);
        await dbConnect();
        const users = await UserModel.find({
          _id: {
            $in: idList,
          },
        }).populate({
          path: 'orgs', // 1st level subdoc (get comments)
          populate: ['group', 'org'],
        });
        console.log(users);
        return users.map((user) => {
          return user.toJSON();
        });
      } catch (error) {
        throw error;
      }
    },
    getUsersByOrg: async (_: any, args: any) => {
      try {
        const idList = args.orgIDs.map((id: string) => new Types.ObjectId(id));
        console.log(idList);
        await dbConnect();

        const users = await UserModel.find({
          'orgs.org': {
            $in: idList,
          },
        }).populate({
          path: 'orgs', // 1st level subdoc (get comments)
          populate: ['group', 'org'],
        });
        return users.map((user) => {
          return user.toJSON();
        });
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
        if (args.input?.accountColor) {
          update.accountColor = args.input.accountColor;
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
    updateUsersGroup: async (_: any, args: any) => {
      try {
        await dbConnect();
        //eslint-disable-next-ling prettier/prettier
        const results = await Promise.all(
          args.input.map(async (item: IUpdateUserGroup) => {
            await UserModel.updateOne(
              {
                _id: new Types.ObjectId(item.userID),
                'orgs.org': new Types.ObjectId(item.orgID),
              },
              {
                $set: {
                  orgs: {
                    group: item.groupID,
                    org: item.orgID,
                  },
                },
              },
            );
            return;
          }),
        );
        return {
          success: true,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
