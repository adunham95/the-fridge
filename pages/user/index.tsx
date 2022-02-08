// @flow
import { useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { UPDATE_USER_MUTATION } from '../../apiData/mutation/updateUser';
import Layout from '../../components/Layout/Layout';
import { PageBanner } from '../../components/Page/PageBanner';
import { Button } from '../../components/StatelessInput/Button';
import { ColorPicker } from '../../components/StatelessInput/ColorPIcket';
import { Input } from '../../components/StatelessInput/Input';
import { useToast } from '../../components/Toast/ToastContext';

function UserProfile() {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const { data: session } = useSession();
  const myUser = session?.user;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accountColor, setAccountColor] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    console.log(myUser);
    setName(myUser?.name || '');
    setEmail(myUser?.email || '');
    setAccountColor(myUser?.accountColor || '');
  }, [myUser]);

  async function updateMyUser() {
    const updatedUser = {
      name,
      email,
    };
    const { data, error } = await updateUser({
      variables: {
        userInfo: {
          id: myUser?.id,
          ...updatedUser,
        },
      },
    });
    if (data) {
      addToast(`User Updated`);
    }
    if (error) {
      console.log('Create Group Error', error);
      addToast(`There was an issue updating the user`);
    }
  }

  return (
    <Layout>
      <>
        <PageBanner title="Profile" />
        <div className="py-2 px-0 md:px-3">
          <Input id="name" value={name} onChange={setName} label="Name" />
          <Input id="email" value={email} onChange={setEmail} label="Email" />
          {/* <ColorPicker
            id="accountColor"
            value={accountColor}
            label="Account Color"
            onChange={setAccountColor}
          /> */}
          <div className="mt-1 flex justify-end">
            <Button className="bg-brand-400 text-white" onClick={updateMyUser}>
              Update Profile
            </Button>
          </div>
        </div>
      </>
    </Layout>
  );
}

UserProfile.Auth = true;

export default UserProfile;
