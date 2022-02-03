// @flow
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Select } from '../../components/StatelessInput/Select';

export function EditOrg() {
  const [selectedOrg, setSelectedOrg] = useState('');
  const [orgs, setOrgs] = useState<Array<{ value: string, label: string }>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;

  useEffect(() => {
    // console.log(myUser);
    const orgList =
      myUser?.orgs.map((o) => {
        return {
          value: o.org.id,
          label: o.org.name,
        };
      }) || [];

    // console.log(orgList);
    setOrgs(orgList);
    setSelectedOrg(orgList[0].value);
  }, [myUser]);
  return (
    <Layout>
      <>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 inline-block">
              Org
            </h1>
            <Select
              containerClass="ml-auto"
              id="orgs"
              value={selectedOrg}
              options={orgs}
              onChange={setSelectedOrg}
            />
          </div>
        </header>
        <main></main>
      </>
    </Layout>
  );
}

EditOrg.auth = true;

export default EditOrg;
