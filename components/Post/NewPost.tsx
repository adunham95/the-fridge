// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { CREATE_POST_MUTATION } from '../../graphql/mutation/createPost';
import { useOutsideAlerter } from '../../hooks/useOutsideClick';
import { EPostPermission, IPost, EPostApproval } from '../../models/PostModel';
import { EUserPermissions } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';
import { Select } from '../StatelessInput/Select';
import { useToast } from '../Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../Icons';
import { ImageUploader, IUploadedImage } from './ImageUploader';
import { usePermissions } from '../../hooks/usePermissions';
import { SingleImage } from './SingleImage';
import ListSelector from '../StatelessInput/ListSelector';

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

    const thisPostOrg = myUser?.orgs.find((org) => org.org.id === selectedOrg);
    const doesNotRequireApproval = thisPostOrg?.group.permissions.includes(
      EUserPermissions.PRE_POST_APPROVAL,
    );

    const newPostData = {
      newPost: {
        description: newPostText,
        org: selectedOrg,
        postedBy: myUser?.id,
        viewByGroups: selectedGroups,
        permissions: selectedSettings,
        image: images.map((img) => img.id),
        approved: doesNotRequireApproval
          ? EPostApproval.APPROVED
          : EPostApproval.WAITING_APPROVAL,
      },
    };

    // console.log(newPostData);
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
      addToast(
        doesNotRequireApproval ? 'Post Saved' : 'Post Submitted for Review',
        theme.BASE_COLOR.success,
        EIcons.BELL,
      );
      setPostSubmitting(false);
    }
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
        <ListSelector
          title="Share With Groups:"
          showClear
          showAll
          selectedItemList={selectedGroups}
          onChange={(groupList) => setSelectedGroups(groupList)}
          itemList={orgGroups
            .filter((g) =>
              g.permissions.includes(EUserPermissions.CAN_VIEW_POST),
            )
            .map((g) => {
              return {
                id: g.id,
                name: g.name,
              };
            })}
        />
      )}
      {isExpanded && (
        <ListSelector
          title="Share Settings:"
          showClear
          showAll
          selectedItemList={selectedSettings}
          onChange={(groupList) => setSelectedSettings(groupList)}
          itemList={Object.values(EPostPermission).map((g) => {
            return {
              id: g,
              name: g,
            };
          })}
        />
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
