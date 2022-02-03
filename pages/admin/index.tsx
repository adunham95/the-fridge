import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar } from '../../components/Avatar/Avatar';
import Layout from '../../components/Layout/Layout';

const states = [];

const AdminHome = () => {
  const { data: session } = useSession();
  const myUser = session?.user;
  return (
    <Layout>
      <>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
            <Avatar name={myUser?.name || 'A'} color={myUser?.accountColor} />
            <h1 className="text-3xl font-bold text-gray-900 inline-block">
              {myUser?.name}
            </h1>
          </div>
        </header>
        <main className="pt-2 px-1">
          <div>
            <Link href={'/admin/newGroup'} passHref>
              <a>
                <span>New Group</span>
              </a>
            </Link>
            <Link href={'/admin/editOrg'} passHref>
              <a>
                <span>Edit Org</span>
              </a>
            </Link>
          </div>
        </main>
      </>
    </Layout>
  );
};

AdminHome.auth = true;

export default AdminHome;
