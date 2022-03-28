import { useMutation, useQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import IconEmptyFolder from '../../../components/Icons/Icon-Empty-Folder';
import { Loader } from '../../../components/Loader/Loader';
import { BreadCrumb } from '../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../components/Page/PageBanner';
import { useToast } from '../../../components/Toast/ToastContext';
import { GET_POSTS_FOR_APPROVAL } from '../../../graphql/query/getPostsForApproval';
import {
  EPostApproval,
  EPostPermission,
  IPost,
} from '../../../models/PostModel';
import { EUserPermissions } from '../../../models/UserModel';
import theme from '../../../theme/theme.json';

interface IPostChangeValue {
  approval?: EPostApproval;
  viewByGroups?: Array<string>;
  permissions?: Array<EPostPermission | string>;
}

const ApprovePosts = () => {
  const { addToast } = useToast();
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;
  const { loading, data, error } = useQuery(GET_POSTS_FOR_APPROVAL, {
    variables: {
      userID: myUser?.id,
    },
  });

  const [setPostApprovals] = useMutation(SET_POST_APPROVALS);

  useEffect(() => {
    if (data?.getPostsForApproval) {
      setPosts(data?.getPostsForApproval);
    }
  }, [data]);

  useEffect(() => {
    console.log('error', typeof error);
    if (typeof error !== 'undefined') {
      addToast('Error Downloading posts', theme.BASE_COLOR.error);
    }
  }, [error]);

  function postChange(id: string, changeValue: IPostChangeValue) {
    console.log({ changeValue });
    const currentPosts = [...posts];
    const currentPost = currentPosts.find((p) => p.id === id);
    if (changeValue?.approval && currentPost) {
      currentPost.approved = changeValue.approval;
    }
    if (changeValue?.viewByGroups && currentPost) {
      currentPost.viewByGroups = changeValue.viewByGroups;
    }
    if (changeValue?.permissions && currentPost) {
      currentPost.permissions = changeValue.permissions;
    }

    setPosts(currentPosts);
  }

  async function savePosts() {
    addToast('Saving Posts...', theme.BASE_COLOR.warning, EIcons.BELL);
    const changedPosts = [...posts]
      .filter((p) => p.approved !== EPostApproval.WAITING_APPROVAL)
      .filter((p) => {
        addToast(
          'View Groups cannot be empty',
          theme.BASE_COLOR.error,
          EIcons.EXCLAMATION_TRIANGLE,
        );
        return (p.viewByGroups?.length || [].length) > 0;
      })
      .map((p) => {
        return {
          id: p.id,
          approval: p.approved,
          viewByGroups: p.viewByGroups,
          permissions: p.permissions,
        };
      });

    const data = await setPostApprovals({ variables: { posts: changedPosts } });
    if (data?.error) {
      addToast(
        'Posts Failed to save',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION_TRIANGLE,
      );
    }
    if (data?.data) {
      addToast('Posts Saved', theme.BASE_COLOR.success, EIcons.BELL);
      const currentPosts = [...posts].filter(
        (p) =>
          p.approved === EPostApproval.WAITING_APPROVAL ||
          (p.viewByGroups?.length || [].length) === 0,
      );
      setPosts(currentPosts);
    }
  }

  return (
    <>
      <PageBanner title="Approve Posts" />
      <main className="pt-2 px-1 relative">
        <BreadCrumb />
        {loading && (
          <div className="absolute top-2 flex justify-center left-1/2 -translate-x-1/2">
            <Loader />
          </div>
        )}
        {posts.length > 0 && !loading ? (
          <div className="flex flex-wrap mx-auto py-5 px-1 max-w-[1000px]">
            {posts.map((p) => (
              <PostForApproval {...p} key={p.id} onChange={postChange} />
            ))}
          </div>
        ) : (
          <div className="flex items-center flex-col pt-6">
            <h2 className=" text-xl">No Posts To Approve</h2>
            <span className="w-[200px] text-emerald-600">
              <IconEmptyFolder />
            </span>
          </div>
        )}
        {posts.length > 0 && !loading && (
          <button
            className="fixed bottom-2 right-2 px-4 py-2 bg-brand-blue-400 hover:bg-brand-blue-600 text-white rounded text-lg"
            onClick={savePosts}
          >
            Save
          </button>
        )}
      </main>
    </>
  );
};

import { PostCardSmall } from '../../../components/Post/PostCardSmall';
import IconGear from '../../../components/Icons/Icon-gear';
import IconCheck from '../../../components/Icons/Icon-Check';
import IconClose from '../../../components/Icons/Icon-Close';
import { useModal } from '../../../components/Modal/ModalContext';
import Modal from '../../../components/Modal/Modal';
import { ModalContainer } from '../../../components/Modal/ModalContainer';
import ListSelector from '../../../components/StatelessInput/ListSelector';
import { GET_GROUPS_BY_ORG } from '../../../graphql/query/getGroupsByOrg';
import {
  Button,
  EButtonStyle,
} from '../../../components/StatelessInput/Button';
import { SET_POST_APPROVALS } from '../../../graphql/mutation/setPostApprovals';
import { EIcons } from '../../../components/Icons';

interface IProps extends IPost {
  onChange: (id: string, changeValue: IPostChangeValue) => void;
}

function PostForApproval(post: IProps) {
  const { setModalID } = useModal();
  const { data, loading, error } = useQuery(GET_GROUPS_BY_ORG, {
    variables: {
      orgIDs: [post.org.id],
    },
  });
  return (
    <>
      <div className="w-1/2  md:w-1/3 lg:w-1/4 p-1 h-full aspect-square">
        <PostCardSmall {...post} width="full" padding={false} />
        <div className="flex justify-around">
          <div className="p-1 w-full">
            <Button
              buttonStyle={EButtonStyle.WARN}
              className="flex w-full h-full justify-center items-center"
              label="Settings"
              onClick={() => setModalID(`${post.id}-settings`)}
            >
              <>
                <span className=" sr-only">Settings</span>
                <IconGear width={'1em'} />
              </>
            </Button>
          </div>
          <div className="p-1 w-full text-center">
            <input
              type="radio"
              id={`${post.id}-approve`}
              name={`${post.id}-approval-status`}
              value="approve"
              className="hidden peer"
              onChange={() =>
                post.onChange(post.id, { approval: EPostApproval.APPROVED })
              }
            />
            <label
              className="px-1 py-2 peer-checked:bg-opacity-100 bg-opacity-50 bg-emerald-400 text-white w-full rounded cursor-pointer hover:bg-opacity-70 flex justify-center"
              htmlFor={`${post.id}-approve`}
              title="Approve"
            >
              <span className=" sr-only">Approve</span>
              <IconCheck height={'1em'} />
            </label>
          </div>
          <div className="p-1 pr-0 w-full text-center">
            <input
              type="radio"
              id={`${post.id}-deny`}
              name={`${post.id}-approval-status`}
              value="deny"
              className="hidden peer"
              onChange={() =>
                post.onChange(post.id, { approval: EPostApproval.DENY })
              }
            />
            <label
              className="px-1 py-2 peer-checked:bg-opacity-100 bg-opacity-50 bg-rose-400 text-white w-full rounded cursor-pointer hover:bg-opacity-70 flex justify-center"
              htmlFor={`${post.id}-deny`}
              title="Deny"
            >
              <span className="sr-only">Deny</span>
              <IconClose height={'1em'} />
            </label>
          </div>
        </div>
      </div>
      <Modal
        id={`${post.id}-settings`}
        showClose={false}
        background="light"
        className="test-name"
      >
        <ModalContainer className="max-w-[90vw] just" childrenClass="">
          <>
            <ListSelector
              title="Share With Groups:"
              showClear
              showAll
              selectedItemList={post.viewByGroups || []}
              onChange={(groupList) => {
                post.onChange(post.id, { viewByGroups: groupList });
              }}
              itemList={(data?.getGroupsByOrg || [])
                .filter((g: any) =>
                  g.permissions.includes(EUserPermissions.CAN_VIEW_POST),
                )
                .map((g: any) => {
                  return {
                    id: g.id,
                    name: g.name,
                  };
                })}
            />
            <ListSelector
              title="Share Settings:"
              showClear
              showAll
              selectedItemList={post?.permissions || []}
              onChange={(groupList) => {
                post.onChange(post.id, { permissions: groupList });
              }}
              itemList={Object.values(EPostPermission).map((g) => {
                return {
                  id: g,
                  name: g,
                };
              })}
            />
            <div className="flex justify-end">
              <Button
                buttonStyle={EButtonStyle.SUCCESS}
                onClick={() => setModalID('')}
                className=""
              >
                Close
              </Button>
            </div>
          </>
        </ModalContainer>
      </Modal>
    </>
  );
}

ApprovePosts.auth = true;
ApprovePosts.permissions = [
  EUserPermissions.IS_ADMIN,
  EUserPermissions.CAN_APPROVE_POSTS,
];

export default ApprovePosts;
