import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ClientContext } from 'graphql-hooks';
import { useGraphQLClient } from '../lib/graphql-client';
import { SessionProvider } from 'next-auth/react';
import { NextComponentType } from 'next';
import { PostProvider } from '../context/PostContext';
import ToastProvider from '../components/Toast/ToastContext';
import { ModalProvider } from '../components/Modal/ModalContext';
import { UserProvider } from '../context/UserContext';
import Layout from '../components/Layout/Layout';
import AuthWrapper from '../components/Auth/AuthWrapper';
import UserPermissionsModal from '../components/Dev/UserPermissionModal';

type AuthComponent = NextComponentType & {
  auth?: boolean,
  permissions?: Array<string>,
};

type MyAppProps = AppProps & {
  Component: AuthComponent,
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
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
        <meta name="theme-color" content="#5b4b81" />
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={86400}>
        <UserProvider>
          <ToastProvider>
            <ModalProvider>
              <PostProvider>
                <ClientContext.Provider value={graphQLClient}>
                  <Layout>
                    <>
                      {Component.auth ? (
                        <AuthWrapper permissions={Component.permissions || []}>
                          <Component {...pageProps} />
                        </AuthWrapper>
                      ) : (
                        <Component {...pageProps} />
                      )}
                      <UserPermissionsModal id="userPermissions" />
                    </>
                  </Layout>
                </ClientContext.Provider>
              </PostProvider>
            </ModalProvider>
          </ToastProvider>
        </UserProvider>
      </SessionProvider>
    </>
  );
}
