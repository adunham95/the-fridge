// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { GROUP_BY_IDS } from '../../../graphql/query/groupByIds';
import { Input } from '../../../components/StatelessInput/Input';
import { Select } from '../../../components/StatelessInput/Select';
import { EToastType, useToast } from '../../../components/Toast/ToastContext';
import { IGroup, IOrg } from '../../../models/OrgModel';
import { ERoutes } from '../../../models/Routes';
import { BreadCrumb } from '../../../components/nav/BreadCrumb';
import {
  Button,
  EButtonStyle,
} from '../../../components/StatelessInput/Button';
import { UPDATE_ORG_MUTATION } from '../../../graphql/mutation/updateOrg';
import Link from 'next/link';
import theme from '../../../theme/theme.json';
import { EIcons } from '../../../components/Icons';
import { EUserPermissions } from '../../../models/UserModel';
import { EPostPermission } from '../../../models/PostModel';
import { generateURLOrigin } from '../../../util/url';
import ListSelector from '../../../components/StatelessInput/ListSelector';

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

  function setDefaultPostGroups(groups: string[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newOrg: IOrg | undefined = {
      ...selectedOrgData,
      defaultPostGroups: groups,
    };

    setSelectedOrgData(newOrg);
  }

  function setDefaultPostSettings(settings: string[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newOrg: IOrg | undefined = {
      ...selectedOrgData,
      defaultPostSettings: settings,
    };

    setSelectedOrgData(newOrg);
  }

  async function updateOrgData() {
    console.log(selectedOrgData);
    const update = {
      id: selectedOrgData?.id,
      defaultPostGroups: selectedOrgData?.defaultPostGroups,
      defaultPostSettings: selectedOrgData?.defaultPostSettings,
    };

    const { data, error } = await updateOrg({
      variables: { updateOrg: update },
    });

    console.log(data);

    if (data) {
      addToast(`Updated Org`, theme.BASE_COLOR.success, EIcons.USER);
    }
    if (error) {
      console.log('Update Org Error', error);
      addToast(
        `There was an issue updating the group`,
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
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
            <Link
              href={{
                pathname: ERoutes.ADMIN_EDIT_USER_GROUPS,
                query: { orgID: selectedOrg },
              }}
              passHref
            >
              <a className="bg-brand-400 hover:bg-brand-600 text-white mb-1 mr-1 px-2 py-1 rounded">
                <span>Edit User Groups</span>
              </a>
            </Link>
            <CreateInviteLink
              orgID={selectedOrg}
              groups={selectedOrgData?.groups || []}
            />
            <ListSelector
              showAll
              showClear
              scrollText={false}
              title="Set default post groups"
              itemList={(selectedOrgData?.groups || []).map((g) => {
                return {
                  id: g.id,
                  name: g.name,
                };
              })}
              selectedItemList={selectedOrgData.defaultPostGroups || []}
              onChange={(items) => setDefaultPostGroups(items)}
            />
            <ListSelector
              showAll
              showClear
              scrollText={false}
              title="Set default post settings"
              itemList={Object.values(EPostPermission).map((g) => {
                return {
                  id: g,
                  name: g,
                };
              })}
              selectedItemList={selectedOrgData.defaultPostSettings || []}
              onChange={(items) => setDefaultPostSettings(items)}
            />
            <div className="flex justify-end">
              <Button
                onClick={updateOrgData}
                buttonStyle={EButtonStyle.SUCCESS}
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
    let url = `${generateURLOrigin()}${
      ERoutes.AUTH_SIGN_UP
    }?invitecode=${orgID}-${selectedGroup}`;
    if (newUserName !== '') {
      url += `&name=${newUserName}`;
    }
    setInviteLink(url);
  }, [newUserName, orgID, selectedGroup]);

  async function copyText() {
    await navigator.clipboard.writeText(inviteLink);
    addToast('Link Copied', theme.BASE_COLOR['brand-blue']);
  }

  async function shareLink() {
    const shareData = {
      title: 'Share Link',
      text: 'You have been invited to The Fridge',
      url: inviteLink,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (navigator?.canShare) {
      try {
        await navigator.share(shareData);
        console.log('shared link');
        addToast('Link Shared', theme.BASE_COLOR['brand-blue']);
        // resultPara.textContent = 'MDN shared successfully'
      } catch (err) {
        console.log('Could not share');
        addToast(
          'Failed to share link',
          theme.BASE_COLOR.error,
          EIcons.EXCLAMATION,
        );
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
            disabled={orgID === ''}
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
EditOrg.permissions = [EUserPermissions.IS_ADMIN];

export default EditOrg;
