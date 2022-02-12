import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar } from '../../components/Avatar/Avatar';
import Layout from '../../components/Layout/Layout';
import { ERoutes } from '../../models/Routes';

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
          <div className="flex">
            <Link href={ERoutes.ADMIN_NEW_GROUP} passHref>
              <a className="bg-brand-400 hover:bg-brand-600 text-white mb-1 mr-1 px-2 py-1 rounded">
                <span>New Group</span>
              </a>
            </Link>
            <Link href={ERoutes.ADMIN_EDIT_ORG} passHref>
              <a className="bg-brand-400 hover:bg-brand-600 text-white mb-1 mr-1 px-2 py-1 rounded">
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
