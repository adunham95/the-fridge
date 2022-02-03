import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { UserPermissionDetails } from '../../models/UserPermission';

const AdminGroup = () => {
  const [selectedPermission, setSelectedPermission] = useState<Array<string>>(
    [],
  );
  // eslint-disable-next-line prettier/prettier
  const [orgs, setOrgs] = useState<Array<{ orgID: string, name: string }>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;

  useEffect(() => {
    console.log(myUser);
    const orgList =
      myUser?.orgs.map((o) => {
        return {
          orgID: o.org.id,
          name: o.org.name,
        };
      }) || [];

    console.log(orgList);
    setOrgs(orgList);
  }, [myUser]);

  function updatePermission(permString: string) {
    let newPermissions = [...selectedPermission];
    if (newPermissions.includes(permString)) {
      newPermissions = newPermissions.filter((g) => g !== permString);
    } else if (!newPermissions.includes(permString)) {
      newPermissions = [...newPermissions, permString];
    }
    setSelectedPermission(newPermissions);
  }

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
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="org"
                className="block text-sm font-medium text-gray-700"
              >
                Group Belongs To:
                <p></p>
              </label>
              <select
                id="org"
                name="org"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              >
                <option>Select Org</option>
                {orgs.map((o) => (
                  <option value={o.orgID} key={o.orgID}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Group Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Admin"
                  className="focus:ring-brand-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="pt-2">
              <h2 className="text-sm font-medium text-gray-700">
                Group Permissions
              </h2>
              <div className="flex flex-wrap">
                {Object.keys(UserPermissionDetails).map((key) => {
                  const isChecked = selectedPermission.includes(key);
                  return (
                    <span key={key} className="w-1/2 sm:w-1/3 md:w-1/4 p-1">
                      <input
                        className="sr-only"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => updatePermission(key)}
                        id={key}
                      />
                      <label
                        htmlFor={key}
                        className={`p-2 block border  h-full rounded transition cursor-pointer hover:border-brand-400 ${
                          isChecked
                            ? ' border-brand-300 shadow-md shadow-brand-200'
                            : 'border-gray-200'
                        }`}
                      >
                        <span className=" text-base border-b block w-full border-grey-200">
                          {UserPermissionDetails[key].title}
                        </span>
                        <p className="text-sm">
                          {UserPermissionDetails[key].description}
                        </p>
                      </label>
                    </span>
                  );
                })}
              </div>
            </div>
          </form>
        </main>
      </>
    </Layout>
  );
};

AdminGroup.auth = true;

export default AdminGroup;
