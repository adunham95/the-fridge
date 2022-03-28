// @flow
import { useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { UPDATE_USER_MUTATION } from '../../graphql/mutation/updateUser';
import { PageBanner } from '../../components/Page/PageBanner';
import { Button, EButtonStyle } from '../../components/StatelessInput/Button';
import { ColorPicker } from '../../components/StatelessInput/ColorPIcket';
import { Input } from '../../components/StatelessInput/Input';
import { useToast } from '../../components/Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../../components/Icons';
import { reloadSession } from '../../util/auth';

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
      accountColor,
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
      addToast(`User Updated`, theme.BASE_COLOR.success, EIcons.USER);
      reloadSession();
    }
    if (error) {
      console.log('Create Group Error', error);
      addToast(
        `There was an issue updating the user`,
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
    }
  }

  return (
    <>
      <PageBanner title="Profile" />
      <div className="py-2 px-3 md:px-3">
        <Input id="name" value={name} onChange={setName} label="Name" />
        <Input id="email" value={email} onChange={setEmail} label="Email" />
        <ColorPicker
          id="accountColor"
          value={accountColor}
          label="Account Color"
          onChange={setAccountColor}
        />
        <div className="mt-1 flex justify-end">
          <Button buttonStyle={EButtonStyle.BRAND} onClick={updateMyUser}>
            Update Profile
          </Button>
        </div>
      </div>
    </>
  );
}

UserProfile.Auth = true;

export default UserProfile;
