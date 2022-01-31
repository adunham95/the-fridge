// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { CREATE_POST_MUTATION } from '../../api/mutation/createPost';
import { UserContext } from '../../context/UserContext';
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
}
`;

export const NewPost = () => {
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [fetchUser, { loading, error, data }] =
    useManualQuery(ALL_GROUPS_QUERY);
  const [newPostText, setNewPostText] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [postSubmitting, setPostSubmitting] = useState(false);
  const { state } = useContext(UserContext);
  const myUser = state?.user;
  // eslint-disable-next-line prettier/prettier
  const [approvedOrgs, setApprovedOrgs] = useState<Array<{ orgID: string, name: string }>>([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  // eslint-disable-next-line prettier/prettier
  const [orgGroups, setOrgGroups] = useState<Array<any>>([]);

  useEffect(() => {
    const orgs = myUser.orgs
      .filter((o) => {
        return o.group?.permissions.includes(EUserPermissions.CAN_POST);
      })
      .map((o) => {
        return {
          orgID: o.org.id,
          name: o.org.name,
        };
      });
    const fetchOrgs = async () => {
      console.log(orgs);
      const orgIDs = orgs.map((o) => o.orgID);
      const orgNames = await fetchUser({
        variables: { orgIDs },
      });
      console.log(orgNames);
      setOrgGroups(orgNames.data.getGroupsByOrg);
    };

    if (orgs.length > 0) {
      setApprovedOrgs(orgs);
      setSelectedOrg(orgs[0].orgID);
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
        postedBy: myUser.id,
      },
    };
    console.log(newPostData);
    await createPost({ variables: newPostData });
    setNewPostText('');
    setPostMessage('Post Submitted');
    setPostSubmitting(false);
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
          <div className="flex">
            <div>
              {orgGroups.map((g) => (
                <span key={g.id}>{g.name}</span>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="flex justify-between">
        <div>
          <button className="flex rounded-md bg-slate-500 text-white px-2 py-1 ">
            <IconImage height={20} width={20} />
            <span className="pl-2 text-sm">Images</span>
          </button>
        </div>
        <div>{postMessage}</div>
      </div>
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
    </div>
  );
};
