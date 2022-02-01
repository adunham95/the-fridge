import { useState } from 'react';
import Layout from '../../components/Layout/Layout';

const NewUser = () => {
  const [accountColor, setAccountColor] = useState('#fff');

  return (
    <Layout>
      <>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 inline-block">
              Create User
            </h1>
          </div>
        </header>
        <main className="pt-2 px-3">
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="John Smith" />
            </div>
            <div>
              <label htmlFor="accountColor">Account Color</label>
              <input
                id="accountColor"
                value={accountColor}
                onChange={(e) => setAccountColor(e.target.value)}
              />
            </div>
          </form>
        </main>
      </>
    </Layout>
  );
};

export default NewUser;
