import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { useMutation } from 'graphql-hooks';
import { VALIDATE_EMAIL_MUTATION } from '../../graphql/mutation/validateEmail';

function ValidateEmail() {
  const router = useRouter();
  const { code } = router.query;
  const [validateEmail] = useMutation(VALIDATE_EMAIL_MUTATION);
  const [valid, setValid] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    validate();
  }, [code]);

  const validate = async () => {
    console.log({ code });
    if (typeof code !== 'string') {
      return '';
    }
    const data = await validateEmail({ variables: { validationString: code } });
    console.log(data);
    if (data?.error) {
      setMsg('Error Validating Email. Please try again later');
    }
    if (data?.data) {
      setValid(data?.data.validateEmail.success);
    }
  };

  return (
    <>
      <main className="flex justify-center items-center flex-col p-2">
        <h1 className="text-2xl">Validating Email</h1>

        <div className="p-3">
          {valid || (msg === ' ' && <Loader />)}

          {valid && <p>Email Validated</p>}

          {msg !== '' && <p>{msg}</p>}
        </div>
      </main>
    </>
  );
}

export default ValidateEmail;
