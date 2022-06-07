import { EGraphQLErrorCode, GraphQLError } from './../utils/graphqlError';
import { gql } from 'apollo-server-micro';
import dbConnect from '../utils/dbConnect';
import { Types } from 'mongoose';
import { UserModel } from '../auth/models/UserModel_Server';
import bcrypt from 'bcrypt';
import checkIfLoggedIn from '../utils/checkIfUser';
import sendEmail, { EMyEmailTemplates } from '../utils/sendEmail';

function randomString(length: number) {
  return Math.round(
    Math.pow(36, length + 1) - Math.random() * Math.pow(36, length),
  )
    .toString(36)
    .slice(1);
}

export const typeDef = gql`
  type User {
    id: String!
    name: String!
    accountColor: String
    email: String
    orgs: [UserOrgs]
    validEmail: Boolean
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

  extend type Query {
    getUser(id: String!): User!
    getUsersByList(ids: [String!]): [User!]
    getUsersByOrg(orgIDs: [String!]): [User!]
    sendPasswordRequest(email: String!): Success!
  }

  extend type Mutation {
    createUser(input: NewUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    updateUsersGroup(input: [UpdateUserGroup!]): Success!
    validateEmail(validationString: String!): Success!
    updatePassword(
      validationString: String!
      email: String!
      newPassword: String!
    ): Success!
  }
`;

interface IUpdateUserGroup {
  userID: string;
  groupID: string;
  orgID: string;
}

export const resolvers = {
  Query: {
    getUser: async (_: any, args: any, context: any) => {
      try {
        checkIfLoggedIn(context);
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
    getUsersByList: async (_: any, args: any, context: any) => {
      try {
        checkIfLoggedIn(context);
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
    getUsersByOrg: async (_: any, args: any, context: any) => {
      try {
        checkIfLoggedIn(context);
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
    sendPasswordRequest: async (_: any, args: any) => {
      try {
        console.log('Send Password Request');
        const passwordResetTokenString = randomString(10);
        console.log(passwordResetTokenString);
        const update = {
          passwordResetToken: bcrypt.hashSync(passwordResetTokenString, 10),
          // passwordResetToken: passwordResetTokenString,
        };
        await dbConnect();
        const userData = await UserModel.findOne({ email: args.email });
        const user = { ...userData.toJSON() };
        console.log('emailInValid', {
          invalid: !user.validEmail,
          default: user.validEmail,
          user,
        });
        if (!user.validEmail) {
          return {
            success: false,
            msg: 'Email is invalid. We cannot send a password reset. Contact support@fridge.social',
          };
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
          new Types.ObjectId(user.id),
          update,
          { upsert: true, returnDocument: 'after' },
        );
        const data = sendEmail.sentMyTemplateEmail(
          [updatedUser.email],
          EMyEmailTemplates.RESET_PASSWORD_EMAIL,
          {
            passwordResetToken: passwordResetTokenString,
            passwordResetEmail: updatedUser.email,
          },
        );
        console.log(data);
        return {
          success: true,
        };
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
          validEmail: false,
        };
        await dbConnect();
        //TODO add emails already exits check
        const newUser = new UserModel(newUserData);
        const newUserFromDB = await newUser.save();
        const emailData = await sendEmail.sentMyTemplateEmail(
          [newUserData.email],
          EMyEmailTemplates.VALIDATE_EMAIL,
          {
            name: newUserFromDB.name,
            userID: newUserFromDB.id,
          },
        );
        console.log(emailData);
        return newUserFromDB;
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (_: any, args: any, context: any) => {
      try {
        // checkIfLoggedIn(context);
        // if (context.user.id !== args.input.id) {
        //   throw new GraphQLError(
        //     'Cannot update other users',
        //     EGraphQLErrorCode.BAD_USER,
        //   );
        // }

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
    updateUsersGroup: async (_: any, args: any, context: any) => {
      try {
        checkIfLoggedIn(context);
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
    validateEmail: async (_: any, args: any) => {
      try {
        await dbConnect();
        console.log(args);
        const userToValidate = await UserModel.findById(args.validationString);

        const updatedUser = await UserModel.findByIdAndUpdate(
          new Types.ObjectId(userToValidate.id),
          { validEmail: true },
          { upsert: true, returnDocument: 'after' },
        );

        if (updatedUser.validEmail) {
          Error('Email already valid');
        }

        return {
          success: true,
        };
      } catch (error) {
        throw error;
      }
    },
    updatePassword: async (_: any, args: any) => {
      try {
        await dbConnect();
        const selectedUser = await UserModel.findOne({ email: args.email });
        const selectedUserData = { ...selectedUser.toJSON() };
        console.log(selectedUserData);
        const match = await bcrypt.compare(
          args.validationString,
          selectedUser.passwordResetToken,
        );

        console.log('match', match);

        if (!match) {
          return {
            success: false,
            msg: 'Validation Tokens dont match',
          };
        }

        const update: any = {};
        update.password = bcrypt.hashSync(args.newPassword, 10);
        const updatedUser = UserModel.findOneAndUpdate(
          new Types.ObjectId(selectedUserData.id),
          update,
          { upsert: true, returnDocument: 'after' },
        );
        return {
          success: true,
          msg: 'Password Changes Successfully',
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
