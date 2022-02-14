import React from 'react';
import Layout from '../../components/Layout/Layout';
import { PageBanner } from '../../components/Page/PageBanner';

function Auth() {
  return (
    <>
      <PageBanner title="Auth" />
      <main>Content Here</main>
    </>
  );
}

Auth.auth = true;

export default Auth;
