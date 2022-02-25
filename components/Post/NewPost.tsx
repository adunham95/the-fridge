// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { CREATE_POST_MUTATION } from '../../graphql/mutation/createPost';
import { useOutsideAlerter } from '../../hooks/useOutsideClick';
import { EPostPermission, IPost } from '../../models/PostModel';
import { EUserPermissions } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';
import { Select } from '../StatelessInput/Select';
import { useToast } from '../Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../Icons';
import { CameraUploader, ImageUploader, IUploadedImage } from './ImageUploader';
import { ImageOrderer } from './ImageOrderer';
import { usePermissions } from '../../hooks/usePermissions';
import { SingleImage } from './SingleImage';
import IconImage from '../Icons/Icon-Image';

const ALL_GROUPS_QUERY = `
query GetGroupsByOrg($orgIDs:[String!]){
  getGroupsByOrg(orgIDs:$orgIDs){
    id
    name
    permissions
    orgID
  }
  getOrgsByIDs(orgIDs:$orgIDs){
    id
    defaultPostGroups
    defaultPostSettings
  }
}
`;

interface IProps {
  onCreate: (post: IPost) => void;
}

export const NewPost = ({ onCreate }: IProps) => {
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [fetchUser] = useManualQuery(ALL_GROUPS_QUERY);
  const [newPostText, setNewPostText] = useState('');
  const { addToast } = useToast();
  const [postSubmitting, setPostSubmitting] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setExpanded(false));
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
  const [images, setImages] = useState<Array<IUploadedImage>>([]);
  const { userHasPermissions } = usePermissions();

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

  useEffect(() => {
    if (newPostText !== '') {
      setExpanded(true);
    }
    if (images.length > 0) {
      setExpanded(true);
    }
  }, [newPostText, images]);

  function canPost() {
    if (newPostText !== '') {
      return true;
    }
    if (images.length > 0) {
      return true;
    }
  }

  async function createNewPost() {
    if (postSubmitting) {
      return;
    }
    setPostSubmitting(true);
    const newPostData = {
      newPost: {
        description: newPostText,
        org: selectedOrg,
        postedBy: myUser?.id,
        viewByGroups: selectedGroups,
        permissions: selectedSettings,
        image: images.map((img) => img.url),
      },
    };

    console.log(newPostData);
    const data = await createPost({ variables: newPostData });
    if (data?.error) {
      addToast(
        'Post Failed to save',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION_TRIANGLE,
      );
      setPostSubmitting(false);
    }
    if (data?.data) {
      onCreate(data.data.createPost);
      setNewPostText('');
      setImages([]);
      addToast('Post Saved', theme.BASE_COLOR.success, EIcons.BELL);
      setPostSubmitting(false);
    }
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

  function setSettings(setting: string) {
    let newSettings = [...selectedSettings];
    if (newSettings.includes(setting)) {
      newSettings = newSettings.filter((g) => g !== setting);
    } else if (!newSettings.includes(setting)) {
      newSettings = [...newSettings, setting];
    }
    setSelectedSettings(newSettings);
  }

  if (
    userHasPermissions({
      hasNotPermissions: [EUserPermissions.CAN_POST],
    })
  ) {
    return null;
  }

  function removeImg(url: string) {
    const imgs = [...images].filter((img) => img.url !== url);
    setImages(imgs);
  }

  return (
    <div
      className="px-3 py-2 bg-white mb-4 shadow-sm rounded-md mx-1 md:mx-0"
      ref={wrapperRef}
    >
      <div className="flex items-center group">
        <Avatar name={myUser?.name} color={myUser?.accountColor} />
        <input
          className="w-full ring-0 px-1 mr-1"
          placeholder="Write Post"
          onChange={(e) => setNewPostText(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <ImageUploader
          id="imageUploader"
          onUpload={(imgs) => setImages([...images, ...imgs])}
        />
      </div>
      <div className="flex overflow-x-auto pt-2">
        {images.map((img, i) => (
          <SingleImage
            key={img.id}
            index={i + 1}
            {...img}
            onRemove={removeImg}
          />
        ))}
      </div>
      {isExpanded && (
        <>
          {' '}
          <h2>Share With Groups:</h2>
          <div className="overflow-x-auto whitespace-nowrap pt-1">
            <span className="mr-1">
              <button
                className="bg-red-400 text-white p-1 rounded text-sm"
                onClick={() => setSelectedGroups([])}
              >
                Clear
              </button>
            </span>
            {orgGroups
              .filter((g) =>
                g.permissions.includes(EUserPermissions.CAN_VIEW_POST),
              )
              .map((g) => (
                <span key={g.id} className="inline-flex mr-1">
                  <input
                    type="checkbox"
                    id={`${g.id}-value`}
                    checked={selectedGroups.includes(g.id)}
                    onChange={() => setOrgGroup(g.id)}
                    className="hidden peer"
                  />
                  <label
                    className="peer-checked:bg-brand-500 peer-checked:bg-opacity-100 bg-brand-400 bg-opacity-50 text-white p-1 rounded text-sm"
                    htmlFor={`${g.id}-value`}
                  >
                    {g.name}
                  </label>
                </span>
              ))}
          </div>
        </>
      )}
      {isExpanded && (
        <>
          <h2 className="pt-1">Share Settings:</h2>
          <div className="overflow-x-auto whitespace-nowrap pt-1">
            <span className="mr-1">
              <button
                className="bg-red-400 text-white p-1 rounded text-sm"
                onClick={() => setSelectedSettings([])}
              >
                Clear
              </button>
            </span>
            {Object.values(EPostPermission).map((s) => (
              <span key={s} className="inline-flex mr-1">
                <input
                  type="checkbox"
                  id={`${s}-value`}
                  checked={selectedSettings.includes(s)}
                  onChange={() => setSettings(s)}
                  className="hidden peer"
                />
                <label
                  className="peer-checked:bg-brand-500 peer-checked:bg-opacity-100 bg-brand-400 bg-opacity-50 text-white p-1 rounded text-sm"
                  htmlFor={`${s}-value`}
                >
                  {s}
                </label>
              </span>
            ))}
          </div>
        </>
      )}
      {isExpanded && (
        <>
          <h2 className="pt-1">Select Org:</h2>
          <Select
            id="org"
            onChange={setSelectedOrg}
            value={selectedOrg}
            options={approvedOrgs.map((o) => {
              return {
                value: o.orgID,
                label: o.name,
              };
            })}
          />
        </>
      )}
      {isExpanded && (
        <>
          <div className="flex justify-end pt-1">
            <button
              onClick={createNewPost}
              disabled={!canPost()}
              className={`bg-emerald-400 hover:bg-emerald-500 px-2 py-1 text-white rounded disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
};
