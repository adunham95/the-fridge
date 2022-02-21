// @flow
import * as React from 'react';
import IconLogo from '../../components/Icons/Icon-Logo';
import { Button } from '../../components/StatelessInput/Button';
import { Input } from '../../components/StatelessInput/Input';
import theme from '../../theme/theme.json';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function login(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
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
            type="password"
          />
          <div className="pt-2">
            <Button type="submit" className="text-white w-full bg-brand-400">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
