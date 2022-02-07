import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout/Layout';

const Wall = () => {
  const { data: session } = useSession();
  const myUser = session?.user;

  return (
    <Layout>
      <div className=" max-w-md mx-auto py-5">
        <h1>Timeline</h1>
      </div>
    </Layout>
  );
};

Wall.auth = true;

export default Wall;
