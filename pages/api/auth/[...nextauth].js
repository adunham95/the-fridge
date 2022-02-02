import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../utils/dbConnect';
import { Types } from 'mongoose';
import { UserModel } from './models/UserModel_Server';
import { GroupModel } from './models/GroupModel_server';
import { OrgModel } from './models/OrgModel_Server';
import bcrypt from 'bcrypt';

async function getUser(credentials) {
  console.log('getUser');
  try {
    // eslint-disable-next-line prettier/prettier
    await dbConnect();
    const post = await UserModel.findOne({
      email: credentials.username,
    }).populate({
      path: 'orgs', // 1st level subdoc (get comments)
      populate: [
        { path: 'group', model: GroupModel },
        { path: 'org', model: OrgModel },
      ],
    });
    console.log(post);
    const user = { ...post.toJSON() };
    console.log('user', user);
    const match = await bcrypt.compare(credentials.password, user.password);
    console.log(match);
    if (!match) {
      throw 'Passwords Dont Match';
    }
    // console.log(returnUser);
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default NextAuth({
  secret: process.env.JWT_SECRET,
  pages: {
    newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials);

        // Add logic here to look up the user from the credentials supplied
        const user = await getUser(credentials);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          console.log('user', user);
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const { accessToken, ...rest } = user;
        token.accessToken = accessToken;
        token.user = rest;
        console.log(token);
      }
      // Persist the OAuth access_token to the token right after signin
      //   if (account) {
      //     token.accessToken = account.access_token;
      //   }
      return token;
    },
    async session({ session, token, user }) {
      console.log({ token, user });
      session.user = {
        ...session.user,
        ...token.user,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
