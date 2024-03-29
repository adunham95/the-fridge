// @flow
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { EIcons } from '../../components/Icons';
import IconLogo from '../../components/Icons/Icon-Logo';
import { Button, EButtonStyle } from '../../components/StatelessInput/Button';
import { Input } from '../../components/StatelessInput/Input';
import { useToast } from '../../components/Toast/ToastContext';
import { ERoutes } from '../../models/Routes';
import theme from '../../theme/theme.json';

interface ILoginResponse {
  error: string | undefined;
  status: number;
  ok: boolean;
  url: string | null;
}

function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { addToast } = useToast();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    console.log('status', status);
    if (status === 'authenticated') {
      router.push(ERoutes.WALL);
    }
  }, [status]);

  async function login(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    setLoading(true);
    if (email === '' && password === '') {
      setEmail('Credentials Not Provided');
    }
    const res = await signIn('credentials', {
      redirect: false,
      username: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });
    console.log(res);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (res.error) {
      setError('Could Not Login');
      addToast('Error Logging In', theme.BASE_COLOR.error, EIcons.USER);
      setLoading(false);
    } else {
      setLoading(true);
      router.push(ERoutes.WALL);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form className="mt-8 space-y-6" onSubmit={(e) => login(e)}>
        <div className="flex flex-col items-center">
          <IconLogo color={theme.BASE_COLOR.brand} size={60} />
          <h2 className=" text-brand-600 text-xl">The Fridge</h2>
          <h1>Login</h1>
        </div>
        <div className=" -space-y-px">
          <Input
            id="email-address"
            label="Email"
            required
            disabled={loading}
            value={email}
            type="email"
            onChange={(e) => setEmail(e)}
            containerClass="pt-2"
            className="text-black"
          />

          <Input
            id="password"
            label="Password"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e)}
            containerClass="pt-2"
            type="password"
            className="text-black"
          />
          <div className="pt-2">
            <Button buttonStyle={EButtonStyle.BRAND} type="submit">
              Login
            </Button>
          </div>
          <div className="pt-1">
            {error !== '' && (
              <p className="pt-1 text-sm text-rose-500">{error}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
