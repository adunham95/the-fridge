import { useQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import IconEmptyFolder from '../../../components/Icons/Icon-Empty-Folder';
import { Loader } from '../../../components/Loader/Loader';
import { BreadCrumb } from '../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../components/Page/PageBanner';
import { useToast } from '../../../components/Toast/ToastContext';
import { GET_POSTS_FOR_APPROVAL } from '../../../graphql/query/getPostsForApproval';
import { IPost } from '../../../models/PostModel';
import { EUserPermissions } from '../../../models/UserModel';
import theme from '../../../theme/theme.json';

const ApprovePosts = () => {
  const { addToast } = useToast();
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [postApprovals, setPostApprovals] = useState<any>({});
  const { data: session } = useSession();
  const myUser = session?.user;
  const { loading, data, error } = useQuery(GET_POSTS_FOR_APPROVAL, {
    variables: {
      userID: myUser?.id,
    },
  });

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

  function postChange(id: string, value: string) {
    const currentPostValue = { ...postApprovals, [id]: value };
    console.log(currentPostValue);
    setPostApprovals(currentPostValue);
  }

  function savePosts() {}

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

interface IProps extends IPost {
  onChange: (id: string, value: string) => void;
}

function PostForApproval(post: IProps) {
  return (
    <div className="w-1/2  md:w-1/3 lg:w-1/4 p-1 h-full aspect-square">
      <PostCardSmall {...post} width="full" padding={false} />
      <div className="flex justify-around">
        <div className="p-1 w-full">
          <button className="flex w-full h-full bg-west-side-400 text-white min-w-[2em] justify-center items-center rounded p-1">
            <IconGear width={'1em'} />
          </button>
        </div>
        <div className="p-1 w-full text-center">
          <input
            type="radio"
            id={`${post.id}-approve`}
            name={`${post.id}-approval-status`}
            value="approve"
            className="hidden peer"
            onChange={() => post.onChange(post.id, 'approved')}
          />
          <label
            className="px-1 py-2 peer-checked:bg-opacity-100 bg-opacity-50 bg-emerald-400 text-white w-full block rounded cursor-pointer hover:bg-opacity-70"
            htmlFor={`${post.id}-approve`}
          >
            Approve
          </label>
        </div>
        <div className="p-1 pr-0 w-full text-center">
          <input
            type="radio"
            id={`${post.id}-deny`}
            name={`${post.id}-approval-status`}
            value="deny"
            className="hidden peer"
            onChange={() => post.onChange(post.id, 'deny')}
          />
          <label
            className="px-1 py-2 peer-checked:bg-opacity-100 bg-opacity-50 bg-rose-400 text-white w-full block rounded cursor-pointer hover:bg-opacity-70"
            htmlFor={`${post.id}-deny`}
          >
            Deny
          </label>
        </div>
      </div>
    </div>
  );
}

ApprovePosts.auth = true;
ApprovePosts.permissions = [
  EUserPermissions.IS_ADMIN,
  EUserPermissions.CAN_APPROVE_POSTS,
];

export default ApprovePosts;
