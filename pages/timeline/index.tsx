import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout/Layout';
import { PageBanner } from '../../components/Page/PageBanner';
import { Select } from '../../components/StatelessInput/Select';

const Wall = () => {
  const { data: session } = useSession();
  const myUser = session?.user;

  return (
    <div>
      <PageBanner title="Timeline" />
    </div>
  );
};

Wall.auth = true;

export default Wall;
