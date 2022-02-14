// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { GROUP_BY_IDS } from '../../graphql/query/groupByIds';
import Layout from '../../components/Layout/Layout';
import { Input } from '../../components/StatelessInput/Input';
import { Select } from '../../components/StatelessInput/Select';
import { EToastType, useToast } from '../../components/Toast/ToastContext';
import { IGroup, IOrg } from '../../models/OrgModel';
import { ERoutes } from '../../models/Routes';
import { BreadCrumb } from '../../components/nav/BreadCrumb';
import { Button } from '../../components/StatelessInput/Button';
import { UPDATE_ORG_MUTATION } from '../../graphql/mutation/updateOrg';

export function EditOrg() {
  const [fetchGroups, { loading }] = useManualQuery(GROUP_BY_IDS);
  const [updateOrg] = useMutation(UPDATE_ORG_MUTATION);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [selectedOrgData, setSelectedOrgData] = useState<IOrg>();
  const [orgs, setOrgs] = useState<Array<{ value: string, label: string }>>([]);
  const { addToast } = useToast();

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

  async function updateOrgData() {
    console.log(selectedOrgData);
    const update = {
      id: selectedOrgData?.id,
      defaultPostGroups: selectedOrgData?.defaultPostGroups,
    };

    const { data, error } = await updateOrg({
      variables: { updateOrg: update },
    });

    console.log(data);

    if (data) {
      addToast(`Updated Org`);
    }
    if (error) {
      console.log('Update Org Error', error);
      addToast(`There was an issue updating the group`, EToastType.ERROR);
    }
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex items-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 inline-block">
            Update Org
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
        <BreadCrumb />
        {loading && <h1>Loading...</h1>}
        {selectedOrgData && (
          <div>
            <h2 className=" text-xl">{selectedOrgData.name}</h2>
            <CreateInviteLink
              orgID={selectedOrg}
              groups={selectedOrgData?.groups || []}
            />
            <h3 className="block text-sm font-medium text-gray-700 pb-1">
              Set default post groups
            </h3>
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
            <div className="flex justify-end">
              <Button
                onClick={updateOrgData}
                className="bg-teal-600 text-white"
              >
                Update Org Data
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

interface IInviteLinkProps {
  orgID: string;
  groups: Array<IGroup>;
}

function CreateInviteLink({ orgID, groups = [] }: IInviteLinkProps) {
  const [newUserName, setNewUserName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [hasClipboard, setHasClipboard] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (navigator.clipboard) {
      setHasClipboard(true);
    }
  }, []);

  useEffect(() => {
    let url = `${process.env.NEXT_PUBLIC_VERCEL_URL}${ERoutes.AUTH_SIGN_UP}?invitecode=${orgID}-${selectedGroup}`;
    if (newUserName !== '') {
      url += `&name=${newUserName}`;
    }
    setInviteLink(url);
  }, [newUserName, orgID, selectedGroup]);

  async function copyText() {
    await navigator.clipboard.writeText(inviteLink);
    addToast('Link Copied');
  }

  async function shareLink() {
    const shareData = {
      title: 'Share Link',
      text: 'You have been invited to a group on The Fridge',
      url: inviteLink,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (navigator?.canShare) {
      try {
        await navigator.share(shareData);
        console.log('shared link');
        addToast('Link Shared');
        // resultPara.textContent = 'MDN shared successfully'
      } catch (err) {
        console.log('Could not share');
        addToast('Failed to share link', EToastType.ERROR);
        // resultPara.textContent = 'Error: ' + err
      }
    } else {
      console.log(`Your system doesn't support sharing files.`);
    }
  }

  return (
    <div>
      <h3>Create Invite Link</h3>
      <Input
        label="New user name"
        value={newUserName}
        onChange={setNewUserName}
        id={'newUserName'}
      />
      <Select
        label="Select Group"
        value={selectedGroup}
        onChange={setSelectedGroup}
        id={'group'}
        defaultOption="Select Group"
        options={groups.map((g) => {
          return {
            value: g.id,
            label: g.name,
          };
        })}
      />
      <p className="flex justify-between pt-1 items-center">{inviteLink}</p>
      <div className="flex justify-end">
        {hasClipboard && (
          <button
            onClick={copyText}
            disabled={selectedGroup === ''}
            className="bg-brand-400 py-1 px-2 text-white rounded-md disabled:bg-red-400 flex-shrink-0"
          >
            Copy Link
          </button>
        )}
        <button
          disabled={!navigator.canShare}
          onClick={shareLink}
          className="bg-brand-400 py-1 px-2 text-white rounded-md ml-1 disabled:bg-red-400 flex-shrink-0"
        >
          Share Link
        </button>
      </div>
    </div>
  );
}

EditOrg.auth = true;

export default EditOrg;
