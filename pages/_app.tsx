import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ClientContext } from 'graphql-hooks';
import { useGraphQLClient } from '../lib/graphql-client';
import { UserProvider } from '../context/UserContext';
import { OrgProvider } from '../context/OrgContext';
import { ContextLoader } from '../context/ContextLoader';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>The Fridge</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#00abd5" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <OrgProvider>
            <ClientContext.Provider value={graphQLClient}>
              <ContextLoader />
              <Component {...pageProps} />
            </ClientContext.Provider>
          </OrgProvider>
        </UserProvider>
      </SessionProvider>
    </>
  );
}
