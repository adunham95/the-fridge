import { useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { FormEvent, ReactEventHandler, useEffect, useState } from 'react';
import { CREATE_GROUP_MUTATION } from '../../../../graphql/mutation/createOrgs';
import { Select } from '../../../../components/StatelessInput/Select';
import { EUserPermissions } from '../../../../models/UserModel';
import { UserPermissionDetails } from '../../../../models/UserPermission';
import {
  EToastType,
  useToast,
} from '../../../../components/Toast/ToastContext';
import { Button } from '../../../../components/StatelessInput/Button';
import { BreadCrumb } from '../../../../components/nav/BreadCrumb';
import theme from '../../../../theme/theme.json';
import { GroupPermissions } from '../../../../components/StatelessInput/GroupPermissions';

const AdminGroup = () => {
  const [createGroup] = useMutation(CREATE_GROUP_MUTATION);
  const [selectedPermission, setSelectedPermission] = useState<Array<string>>([
    EUserPermissions.CAN_VIEW_POST,
  ]);
  const [groupName, setGroupName] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');
  const { addToast } = useToast();
  // eslint-disable-next-line prettier/prettier
  const [orgs, setOrgs] = useState<Array<{ orgID: string, name: string }>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;

  useEffect(() => {
    // console.log(myUser);
    const orgList =
      myUser?.orgs.map((o) => {
        return {
          orgID: o.org.id,
          name: o.org.name,
        };
      }) || [];

    // console.log(orgList);
    setOrgs(orgList);
  }, [myUser]);

  function canSave() {
    if (selectedPermission.length === 0) {
      return false;
    }
    if (groupName === '') {
      return false;
    }
    if (selectedOrg === '') {
      return false;
    }
    return true;
  }

  function updatePermission(permString: string) {
    let newPermissions = [...selectedPermission];
    if (newPermissions.includes(permString)) {
      newPermissions = newPermissions.filter((g) => g !== permString);
    } else if (!newPermissions.includes(permString)) {
      newPermissions = [...newPermissions, permString];
    }
    setSelectedPermission(newPermissions);
  }

  async function makeGroup(e: FormEvent) {
    e.preventDefault();
    const newGroup = {
      name: groupName,
      orgID: selectedOrg,
      permissions: selectedPermission,
    };
    console.log(newGroup);
    const { data, error } = await createGroup({
      variables: { newGroup },
    });

    console.log(data);

    if (data) {
      addToast(
        `Group ${data.createGroup.name} created`,
        theme.BASE_COLOR.success,
      );
      setGroupName('');
      setSelectedOrg('');
    }
    if (error) {
      console.log('Create Group Error', error);
      addToast(`There was an issue creating the group`, theme.BASE_COLOR.error);
    }
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 inline-block">
            Create Group
          </h1>
        </div>
      </header>
      <main className="pt-2 px-3">
        <BreadCrumb />
        <form onSubmit={makeGroup}>
          <Select
            label="Group Belongs To"
            id="org"
            defaultOption="Select a Group"
            onChange={setSelectedOrg}
            value={selectedOrg}
            options={orgs.map((o) => {
              return {
                value: o.orgID,
                label: o.name,
              };
            })}
          />
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
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="focus:ring-brand-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <GroupPermissions
            selectedPermission={selectedPermission}
            onChange={(key) => updatePermission(key)}
          />
          <div className="flex justify-end pt-2">
            <Button
              disabled={!canSave()}
              className="text-white bg-brand-400 hover:bg-brand-600"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

AdminGroup.auth = true;
AdminGroup.permissions = [EUserPermissions.IS_ADMIN];

export default AdminGroup;
