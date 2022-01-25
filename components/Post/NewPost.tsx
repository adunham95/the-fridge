// @flow
import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { EUserPermissions } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';
import IconImage from '../Icons/Icon-Image';

const myOrgs = [
  {
    name: 'Adrians Family',
    id: 'Adrian',
  },
  {
    name: 'Emelies Family',
    id: 'Emelie',
  },
];

export const NewPost = () => {
  const [newPostText, setNewPostText] = useState('');
  const myUser = useAppSelector((state) => state?.user);
  const selectedOrg = myOrgs[1];

  function canPost() {
    if (
      !myUser.permissions[selectedOrg.id] &&
      !myUser.permissions[selectedOrg.id]?.includes(EUserPermissions.CAN_POST)
    ) {
      return false;
    }
    if (newPostText !== '') {
      return true;
    }
  }

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Avatar name={myUser.name} />
        <select className="px-2">
          {myOrgs
            .filter((o) =>
              myUser.permissions[o.id]?.includes(EUserPermissions.CAN_POST)
            )
            .map((o) => (
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
        </div>
        <div>
          <button
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
