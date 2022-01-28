// @flow
import { useMutation } from 'graphql-hooks';
import React, { useContext, useState } from 'react';
import { CREATE_POST_MUTATION } from '../../api/mutation/createPost';
import { UserContext } from '../../context/UserContext';
import { EUserPermissions } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';
import IconImage from '../Icons/Icon-Image';

const myOrgs = [
  {
    name: 'Adrian Test Org',
    id: '61f28acf4956e23fa1c4534c',
  },
  {
    name: '61f28df14956e23fa1c45352',
    id: 'Emelie Org',
  },
];

export const NewPost = () => {
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [newPostText, setNewPostText] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [postSubmitting, setPostSubmitting] = useState(false);
  const { state } = useContext(UserContext);
  const myUser = state?.user;
  const approvedOrgs = myOrgs.filter(
    (o) =>
      myUser?.permissions[o.id]?.includes(EUserPermissions.CAN_POST) ||
      myUser?.permissions[o.id]?.includes(EUserPermissions.CAN_POST_W_APPROVAL),
  );
  const [selectedOrg, setSelectedOrg] = useState(approvedOrgs[0]?.id);

  function canPost() {
    if (newPostText !== '') {
      return true;
    }
    return !postSubmitting;
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
        orgID: selectedOrg,
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
            <option key={o.id} value={o.id}>
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
          <div>
            <button className="flex rounded-md bg-slate-500 text-white px-2 py-1 ">
              <IconImage height={20} width={20} />
              <span className="pl-2 text-sm">Images</span>
            </button>
          </div>
          <div>{postMessage}</div>
        </div>
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
