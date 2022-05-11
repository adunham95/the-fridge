// @flow
import { LockClosedIcon } from '@heroicons/react/outline';
import { useMutation } from 'graphql-hooks';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import { EIcons } from '../../components/Icons';
import { Checkbox } from '../../components/StatelessInput/Checkbox';
import { ColorPicker } from '../../components/StatelessInput/ColorPIcket';
import { Input } from '../../components/StatelessInput/Input';
import { useToast } from '../../components/Toast/ToastContext';
import { ERoutes, RouteNames } from '../../models/Routes';
import theme from '../../theme/theme.json';

const CREATE_USER_MUTATION = `mutation CreatUser($newUser:NewUserInput!) {
    createUser(input:$newUser) {
      name
      accountColor
      id
    }}`;

type NewUserQuery = ParsedUrlQuery & {
  invitecode: string | undefined,
  name: string | undefined,
  email: string | undefined,
};

export default function NewUser() {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [accountColor, setAccountColor] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [inviteCode, setInviteCode] = useState<string>('');
  const [legalChecked, setLegalChecked] = useState(false);
  const { query } = useRouter();
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (query?.invitecode && !Array.isArray(query.invitecode)) {
      setInviteCode(query.invitecode);
    }
    if (query?.name && !Array.isArray(query.name)) {
      setName(query.name);
    }
    if (query?.email && !Array.isArray(query.email)) {
      setName(query.email);
    }
  }, [query]);

  async function CreateUser(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    console.log('Create User');
    if (!legalChecked) {
      addToast('Legal Not Accepted', theme.BASE_COLOR.error);
      return;
    }
    if (Array.isArray(inviteCode)) {
      return;
    }
    const orgData = inviteCode.split(',').map((c) => {
      const set = c.split('-');
      const orgData: { org?: string, group?: string } = {};
      console.log(set);
      if (set[0]) {
        orgData.org = set[0];
      }
      if (set[1]) {
        orgData.group = set[1];
      }
      return orgData;
    });
    let newUser = {};
    if (orgData[0]?.org) {
      newUser = {
        newUser: {
          name,
          email,
          username: username !== '' ? username : email,
          password,
          accountColor,
          orgs: orgData,
        },
      };
    } else {
      newUser = {
        newUser: {
          name,
          email,
          username: username !== '' ? username : email,
          password,
          accountColor,
        },
      };
    }
    console.log(newUser);

    const { data, error } = await createUser({ variables: newUser });
    if (error) {
      addToast('Error Creating User', theme.BASE_COLOR.error);
    }
    if (data) {
      addToast('User Created', theme.BASE_COLOR.success, EIcons.USER);
      const res = await signIn('credentials', {
        redirect: false,
        username: email,
        password: password,
        callbackUrl: `${window.location.origin}`,
      });
      //@ts-ignore
      if (res.error) {
        addToast('Error Logging In', theme.BASE_COLOR.error, EIcons.USER);
      } else {
        addToast(
          'Account Created Logging In',
          theme.BASE_COLOR.success,
          EIcons.USER,
        );
        router.push(ERoutes.WALL);
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={CreateUser}>
            <div className=" -space-y-px">
              <Input
                label="Name"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e)}
              />

              <Input
                id="email-address"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e)}
                containerClass="pt-2"
              />

              <Input
                id="password"
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e)}
                containerClass="pt-2"
              />

              <Input
                id="inviteCode"
                label="Invite Code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e)}
                containerClass="pt-2"
              />

              <ColorPicker
                id="Account Color"
                value={accountColor}
                onChange={(color) => setAccountColor(color)}
                containerClass="pt-2"
                label="Account Color"
              />
              <Checkbox
                id="legalCheck"
                value={legalChecked}
                onChange={setLegalChecked}
                label={
                  <p className=" font-normal">
                    I agree to the{' '}
                    <Link passHref href={ERoutes.TOS}>
                      <a className="underline">{RouteNames[ERoutes.TOS]}</a>
                    </Link>
                    {' & '}
                    <Link passHref href={ERoutes.PRIVACY_POLICY}>
                      <a className="underline">
                        {RouteNames[ERoutes.PRIVACY_POLICY]}
                      </a>
                    </Link>
                  </p>
                }
                containerClass="pt-2"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-brand-500 group-hover:text-brand-400"
                    aria-hidden="true"
                  />
                </span>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
