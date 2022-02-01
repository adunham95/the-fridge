import Layout from '../../components/Layout/Layout';
import { UserPermissionDetails } from '../../models/UserPermission';

const AdminGroup = () => {
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
        <main className="pt-2 px-3">
          <form>
            <div>
              <label htmlFor="name">Group Name</label>
              <input id="name" placeholder="Admin" />
            </div>
            <div>
              <h2>Group Permissions</h2>
              {Object.keys(UserPermissionDetails).map((key) => (
                <div key={key}>
                  <span>{UserPermissionDetails[key].title}</span>
                  <p>{UserPermissionDetails[key].description}</p>
                </div>
              ))}
            </div>
          </form>
        </main>
      </>
    </Layout>
  );
};

export default AdminGroup;
