// @flow
import { LockClosedIcon } from '@heroicons/react/outline';
import { useMutation } from 'graphql-hooks';
import React, { useState } from 'react';

const CREATE_USER_MUTATION = `mutation CreatUser($newUser:NewUserInput!) {
    createUser(input:$newUser) {
      name
      accountColor
      id
    }}`;

export default function NewUser() {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  function CreateUser(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    console.log('Create User');
    const orgData = inviteCode.split(',').map((c) => {
      const set = c.split('-');
      return {
        org: set[0] || '',
        group: set[1] || '',
      };
    });
    console.log(orgData);
    const newUser = {
      newUser: {
        name,
        email,
        username: username !== '' ? username : email,
        password,
        orgs: orgData,
      },
    };
    console.log(newUser);
    createUser({ variables: newUser });
    // updateUser({ variables: { id, name: newName } })
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
          <form className="mt-8 space-y-6" onSubmit={(e) => CreateUser(e)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="inviteCode" className="sr-only">
                  Invite Code
                </label>
                <textarea
                  id="inviteCode"
                  name="inviteCode"
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                  placeholder="Invite Code"
                />
              </div>
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
