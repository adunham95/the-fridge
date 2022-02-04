// @flow
import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { GROUP_BY_IDS } from '../../apiData/query/groupByIds';
import Layout from '../../components/Layout/Layout';
import { Select } from '../../components/StatelessInput/Select';
import { IOrg } from '../../models/OrgModel';

export function EditOrg() {
  const [fetchGroups, { loading }] = useManualQuery(GROUP_BY_IDS);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [selectedOrgData, setSelectedOrgData] = useState<IOrg>();
  const [orgs, setOrgs] = useState<Array<{ value: string, label: string }>>([]);

  // eslint-disable-next-line prettier/prettier
  const [orgData, setOrgData] = useState<Array<IOrg>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;

  useEffect(() => {
    const selected = orgData.find((o) => o.id === selectedOrg);
    setSelectedOrgData(selected);
  }, [selectedOrg, orgData]);

  useEffect(() => {
    const orgList =
      myUser?.orgs.map((o) => {
        return {
          value: o.org.id,
          label: o.org.name,
        };
      }) || [];
    setOrgs(orgList);
    fetchGroupData(orgList.map((o) => o.value));
    setSelectedOrg(orgList[0].value);
  }, [myUser]);

  const fetchGroupData = async (groupList: Array<string>) => {
    const data = await fetchGroups({
      variables: {
        ids: groupList,
      },
    });
    setOrgData(data.data.getOrgsByIDs);
  };

  function setDefaultPostGroups(
    id: null | string = null,
    all = false,
    none = false,
  ) {
    let newGroup = [...(selectedOrgData?.defaultPostGroups || [])];
    if (id !== null) {
      if (newGroup.includes(id)) {
        newGroup = newGroup.filter((g) => g !== id);
      } else if (!newGroup.includes(id)) {
        newGroup = [...newGroup, id];
      }
    }
    if (all) {
      newGroup = (selectedOrgData?.groups || []).map((g) => g.id);
    }
    if (none) {
      newGroup = [];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newOrg: IOrg | undefined = {
      ...selectedOrgData,
      defaultPostGroups: newGroup,
    };

    setSelectedOrgData(newOrg);
  }

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
        <main className="pt-2 px-2">
          {loading && <h1>Loading...</h1>}
          {selectedOrgData && (
            <div>
              <h2 className=" text-xl">{selectedOrgData.name}</h2>
              <h3>Set default post groups</h3>
              <div>
                <button
                  onClick={() => setDefaultPostGroups(null, true)}
                  className="text-white py-1 px-2 mr-1 mb-1 rounded bg-emerald-400 "
                >
                  All
                </button>
                <button
                  onClick={() => setDefaultPostGroups(null, false, true)}
                  className="text-white py-1 px-2 mr-1 mb-1 rounded bg-rose-400 "
                >
                  None
                </button>
                {(selectedOrgData?.groups || []).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setDefaultPostGroups(g.id)}
                    className={`bg-brand-400 text-white py-1 px-2 mr-1 mb-1 rounded ${
                      selectedOrgData.defaultPostGroups?.includes(g.id)
                        ? 'opacity-100'
                        : 'opacity-70'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </>
    </Layout>
  );
}

EditOrg.auth = true;

export default EditOrg;
