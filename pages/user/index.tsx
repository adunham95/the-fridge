// @flow
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { PageBanner } from '../../components/Page/PageBanner';
import { ColorPicker } from '../../components/StatelessInput/ColorPIcket';
import { Input } from '../../components/StatelessInput/Input';

function UserProfile() {
  const { data: session } = useSession();
  const myUser = session?.user;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accountColor, setAccountColor] = useState('');

  useEffect(() => {
    console.log(myUser);
    setName(myUser?.name || '');
    setEmail(myUser?.email || '');
    setAccountColor(myUser?.accountColor || '');
  }, [myUser]);

  return (
    <Layout>
      <>
        <PageBanner title="Profile" />
        <div className="py-2 px-0 md:px-3">
          <Input id="name" value={name} onChange={setName} label="Name" />
          <Input id="email" value={email} onChange={setEmail} label="Email" />
          <ColorPicker
            id="accountColor"
            value={accountColor}
            label="Account Color"
            onChange={setAccountColor}
          />
        </div>
      </>
    </Layout>
  );
}

UserProfile.Auth = true;

export default UserProfile;
