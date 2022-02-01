// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { CREATE_POST_MUTATION } from '../../api/mutation/createPost';
import { EUserPermissions } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';
import IconImage from '../Icons/Icon-Image';

const ALL_GROUPS_QUERY = `
query GetGroupsByOrg($orgIDs:[String!]){
  getGroupsByOrg(orgIDs:$orgIDs){
    id
    name
    orgID
  }
  getOrgsByIDs(orgIDs:$orgIDs){
    id
    defaultPostGroups
    defaultPostSettings
  }
}
`;

export const NewPost = () => {
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [fetchUser, { loading, error, data }] =
    useManualQuery(ALL_GROUPS_QUERY);
  const [newPostText, setNewPostText] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [postSubmitting, setPostSubmitting] = useState(false);
  const { data: session } = useSession();
  const myUser = session?.user;
  // eslint-disable-next-line prettier/prettier
  const [approvedOrgs, setApprovedOrgs] = useState<Array<{ orgID: string, name: string }>>([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  // eslint-disable-next-line prettier/prettier
  const [orgGroups, setOrgGroups] = useState<Array<any>>([]);
  // eslint-disable-next-line prettier/prettier
  const [selectedGroups, setSelectedGroups] = useState<Array<any>>([])
  // eslint-disable-next-line prettier/prettier
  const [selectedSettings, setSelectedSettings] = useState<Array<any>>([])

  useEffect(() => {
    const orgs =
      myUser?.orgs
        .filter((o) => {
          return o.group?.permissions.includes(EUserPermissions.CAN_POST);
        })
        .map((o) => {
          return {
            orgID: o.org.id,
            name: o.org.name,
          };
        }) || [];
    const fetchOrgs = async () => {
      console.log(orgs);
      const orgIDs = orgs.map((o) => o.orgID);
      const orgNames = await fetchUser({
        variables: { orgIDs },
      });

      const orgData = orgs.map((o) => {
        const orgData = orgNames.data.getOrgsByIDs.find(
          (p: { id: string }) => p.id === o.orgID,
        );
        return {
          ...o,
          defaults: {
            postGroups: orgData?.defaultPostGroups,
            postSettings: orgData?.defaultPostSettings,
          },
        };
      });
      console.log(orgData);

      setOrgGroups(orgNames.data.getGroupsByOrg);
      setApprovedOrgs(orgData);
      setSelectedOrg(orgs[0].orgID);
      setSelectedGroups(orgData[0].defaults.postGroups);
      setSelectedSettings(orgData[0].defaults.postSettings);
    };

    if (orgs.length > 0) {
      fetchOrgs().catch(console.error);
    }
  }, [myUser]);

  function canPost() {
    if (newPostText !== '') {
      return true;
    }
  }

  async function createNewPost() {
    if (postSubmitting) {
      return;
    }
    setPostSubmitting(true);
    setPostMessage('Saving...');
    const newPostData = {
      newPost: {
        description: newPostText,
        org: selectedOrg,
        postedBy: myUser?.id,
        viewBy: selectedGroups,
      },
    };
    console.log(newPostData);
    await createPost({ variables: newPostData });
    setNewPostText('');
    setPostMessage('Post Submitted');
    setPostSubmitting(false);
  }

  function setOrgGroup(groupVal: string) {
    let newGroup = [...selectedGroups];
    if (newGroup.includes(groupVal)) {
      newGroup = newGroup.filter((g) => g !== groupVal);
    } else if (!newGroup.includes(groupVal)) {
      newGroup = [...newGroup, groupVal];
    }
    setSelectedGroups(newGroup);
  }

  if (approvedOrgs.length === 0) {
    return null;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Avatar name={myUser?.name} />
        <select
          className="px-2"
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
        >
          {approvedOrgs.map((o) => (
            <option key={o.orgID} value={o.orgID}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={newPostText}
        onChange={(e) => setNewPostText(e.target.value)}
        className="w-full p-1 border border-brand-400 mt-1 rounded"
      />
      <div className="flex justify-between">
        <div>
          <button className="flex rounded-md bg-slate-500 text-white px-2 py-1 ">
            <IconImage height={20} width={20} />
            <span className="pl-2 text-sm">Images</span>
          </button>
        </div>
        <div>{postMessage}</div>
      </div>
      {canPost() && (
        <>
          <h2>Share With Groups:</h2>
          <div className="overflow-x-auto whitespace-nowrap">
            <span className="mr-1">
              <button
                className="bg-red-400 text-white p-1 rounded text-sm"
                onClick={() => setSelectedGroups([])}
              >
                Clear
              </button>
            </span>
            {orgGroups.map((g) => (
              <span key={g.id} className="inline-flex mr-1">
                <input
                  type="checkbox"
                  id={`${g.id}-value`}
                  checked={selectedGroups.includes(g.id)}
                  onChange={() => setOrgGroup(g.id)}
                  className="hidden peer"
                />
                <label
                  className="peer-checked:bg-blue-500 peer-checked:bg-opacity-100 bg-blue-400 bg-opacity-50 text-white p-1 rounded text-sm"
                  htmlFor={`${g.id}-value`}
                >
                  {g.name}
                </label>
              </span>
            ))}
          </div>
        </>
      )}
      <div>
        <div>
          <button
            onClick={createNewPost}
            disabled={!canPost()}
            className={`${canPost() ? 'text-green-400' : 'text-gray-500'}`}
          >
            Post
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div>{postMessage}</div>
      </div>
    </div>
  );
};
