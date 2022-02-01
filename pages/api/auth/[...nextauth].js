import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../utils/dbConnect';
import { Types } from 'mongoose';
import { UserModel } from '../../../models/UserModel_Server';
import bcrypt from 'bcrypt';

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

        async function getUser() {
          try {
            // eslint-disable-next-line prettier/prettier
            await dbConnect();
            const post = await UserModel.findOne({
              email: credentials.username,
            }).populate({
              path: 'orgs', // 1st level subdoc (get comments)
              populate: ['group', 'org'],
            });
            delete post.password;
            const user = { ...post.toJSON() };
            console.log('user', user);
            const match = await bcrypt.compare(
              credentials.password,
              user.password,
            );
            console.log(match);
            if (!match) {
              throw 'Passwords Dont Match';
            }
            // console.log(returnUser);
            return user;
          } catch (error) {
            throw error;
          }
        }

        // Add logic here to look up the user from the credentials supplied
        const user = await getUser();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          console.log(user);
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});
