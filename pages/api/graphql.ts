// /* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloServer } from 'apollo-server-micro';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schemas';
import resolvers from './resolvers';
import { getToken } from 'next-auth/jwt';
const secret = process.env.JWT_SECRET || '';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({ req, res }) => {
    const token = await getToken({ req, secret });

    console.log('token', { token });
    return { user: token?.user };
  },
});

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
