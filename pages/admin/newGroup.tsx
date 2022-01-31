import Layout from '../../components/Layout/Layout';
import { useUser } from '../../context/UserContext';

const AdminGroup = () => {
  const {
    state: { user: myUser },
  } = useUser();
  console.log(myUser);
  return (
    <Layout>
      <>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 inline-block">
              Create Group
            </h1>
          </div>
        </header>
        <main className="pt-2 px-1"></main>
      </>
    </Layout>
  );
};

export default AdminGroup;
