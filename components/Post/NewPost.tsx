// @flow
import React, { useState } from 'react';
import { EUserPermissions, IUser } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';
import IconImage from '../Icons/Icon-Image';

const myUser: IUser = {
  id: 'adrian',
  name: 'Adrian Dunham',
  permissions: [EUserPermissions.CAN_POST],
};

export const NewPost = () => {
  const [newPostText, setNewPostText] = useState('');

  function canPost() {
    if (newPostText !== '') {
      return true;
    }
  }

  return (
    <div className="p-2">
      <div>
        <Avatar name={myUser.name} />
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
