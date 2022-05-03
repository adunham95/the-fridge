import { useManualQuery } from 'graphql-hooks';
import React, { useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { Button, EButtonStyle } from '../../components/StatelessInput/Button';
import { Input } from '../../components/StatelessInput/Input';
import { QUERY_RESET_PASSWORD } from '../../graphql/query/sendPasswordReset';

function ValidateEmail() {
  const [email, setEmail] = useState('');
  const [fetchRest, { loading }] = useManualQuery(QUERY_RESET_PASSWORD);

  async function submitPasswordReset(e: React.FormEvent) {
    e.preventDefault();
    console.log({
      email,
    });
    const data = await fetchRest({
      variables: {
        email,
      },
      useCache: false,
    });
    console.log(data);
  }

  return (
    <>
      <main className="flex justify-center items-center flex-col p-2">
        <h1 className="text-2xl">Reset Password</h1>

        <form onSubmit={submitPasswordReset}>
          <Input
            id="emailReset"
            label="Email"
            placeholder="email@fridge.social"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <Button
            buttonStyle={EButtonStyle.SUCCESS}
            type="submit"
            className="w-full mt-2"
          >
            Change Password
          </Button>
        </form>

        {/* <div className="p-3">
          {valid || (msg === ' ' && <Loader />)}

          {valid && <p>Email Validated</p>}

          {msg !== '' && <p>{msg}</p>}
        </div> */}
      </main>
    </>
  );
}

export default ValidateEmail;
