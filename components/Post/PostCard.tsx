import Comments from './Comments';
import theme from '../../theme/theme.json';
import { EPostPermission, IPost } from '../../models/PostModel';
import { Avatar } from '../Avatar/Avatar';
import { useSession } from 'next-auth/react';
import { ImageCarousel } from '../Image/ImageCarousel';
import { useModal } from '../Modal/ModalContext';
import Modal from '../Modal/Modal';
import { IComment } from '../../models/CommentModel';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'graphql-hooks';
import { GET_COMMENT_BY_POST } from '../../graphql/query/getCommentsByPost';
import { useToast } from '../Toast/ToastContext';
import { Loader } from '../Loader/Loader';
import { usePost } from '../../context/PostContext';
import { POST_ACTION } from '../../reducers/postReducer';
import { UPDATE_LIKE } from '../../graphql/mutation/updateLike';
import { EIcons } from '../Icons';
import { PostActionButton } from './PostAction';
import { generateURLOrigin } from '../../util/url';

function PostCard({
  id,
  description = '',
  permissions = [],
  comments = [],
  likedBy = [],
  postedBy,
  image = [],
  dateTime,
}: IPost) {
  const { setModalID } = useModal();
  function formatDate(date: string) {
    const d = new Date(date);
    const datestring = `${
      d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${(
      '0' + d.getMinutes()
    ).slice(-2)}`;
    return datestring;
  }

  console.log({ id, permissions });

  return (
    <div className="mb-3 pb-1" id={id}>
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-2">
          <div className="flex items-center">
            <Avatar name={postedBy.name} color={postedBy.accountColor} />
            <div className="flex flex-col justify-start pl-1">
              <p>{postedBy.name}</p>
              <p className="text-slate-600 text-xs">{formatDate(dateTime)}</p>
            </div>
          </div>
        </div>
        {description !== '' && (
          <div className="px-2 pb-1">
            <span className=" text-slate-700">{description}</span>
          </div>
        )}
        {image.length > 0 && (
          <div className="w-full px-2">
            <ImageCarousel images={image} />
          </div>
        )}
        <div className="p-2 flex w-full justify-start items-center">
          <PostLikes likes={likedBy} postID={id} />
          {!permissions.includes(EPostPermission.DISALLOW_COMMENT) && (
            <PostActionButton
              onClick={() => setModalID(`${id}-comments`)}
              icon={EIcons.COMMENT}
              className="text-brand-400"
              actionName="Comment"
            >
              <span className=" ml-1">{comments.length}</span>
            </PostActionButton>
          )}
          {permissions.includes(EPostPermission.ALLOW_SHARE) &&
            permissions.includes(EPostPermission.IS_PUBLIC) && (
              <PostShare postID={id} />
            )}
        </div>
      </div>
      <Modal
        id={`${id}-comments`}
        position="center bottom"
        background="light"
        className="w-full sm:max-w-[500px] rounded-t-md"
        closeClassName="bg-rose-400 text-white hover:text-rose-700 rounded-full h-[1em] w-[1em] shadow-sm flex justify-center items-center right-1"
      >
        <PostComments postID={id} />
      </Modal>
    </div>
  );
}

function PostComments({ postID }: { postID: string }) {
  const [comments, setComments] = useState<Array<IComment>>([]);
  const { loading, data, error, refetch } = useQuery(GET_COMMENT_BY_POST, {
    variables: { id: postID },
  });
  const { addToast } = useToast();

  useEffect(() => {
    console.log('postID', postID);
  }, [postID]);

  useEffect(() => {
    console.log(data);
    if (error) {
      addToast(
        'Could not load comments',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
      setComments([]);
    }
    if (data?.getCommentsByPost !== null) {
      setComments(data?.getCommentsByPost);
    }
  }, [data, error]);

  function onCommentUpdate() {
    refetch();
  }

  return (
    <div className=" pt-1 pb-1 w-full bg-white rounded-t-md">
      <p className="mx-2 mb-2 border-b border-slate-200">Comments</p>
      {loading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      <Comments
        comments={comments}
        allowComment
        postID={postID}
        onCommentUpdate={onCommentUpdate}
      />
    </div>
  );
}

interface IPostLikeProps {
  likes: Array<string>;
  postID: string;
}

function PostLikes({ likes, postID }: IPostLikeProps) {
  const [createLike, { loading }] = useMutation(UPDATE_LIKE);
  const { addToast } = useToast();
  const { data: session } = useSession();
  const myUser = session?.user;
  const { dispatch } = usePost();

  async function updateLike() {
    const data = await createLike({
      variables: {
        likeInput: {
          userID: myUser?.id || '',
          postID,
          action: likes.includes(myUser?.id || '') ? 'remove' : 'add',
        },
      },
    });
    if (data.error || data?.data?.updateLike?.success === false) {
      addToast(
        'Error updating like',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
    }
    if (data?.data?.updateLike?.success) {
      addToast('Updated Like', theme.BASE_COLOR.success, EIcons.THUMB_UP);
      dispatch({
        type: POST_ACTION.UPDATE_LIKE,
        payload: {
          userID: myUser?.id || '',
          postID,
        },
      });
    }
  }

  return (
    <PostActionButton
      actionName="Like"
      onClick={updateLike}
      icon={EIcons.HEART}
      className={`${
        likes.includes(myUser?.id || '') ? 'text-red-500' : 'text-pink-300'
      }`}
    >
      <span className=" ml-1">{likes.length}</span>
    </PostActionButton>
  );
}

interface IPostShare {
  postID: string;
}

function PostShare({ postID }: IPostShare) {
  const { addToast } = useToast();

  async function sharePost() {
    const url = `${generateURLOrigin()}/post/${postID}`;
    const shareData = {
      title: 'View Post',
      text: 'View Post on the fridge',
      url,
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
    } else if (navigator?.clipboard) {
      await navigator.clipboard.writeText(url);
      addToast('Link Copied', theme.BASE_COLOR['brand-blue']);
    } else {
      console.log(`Your system doesn't support sharing`);
    }
  }

  if (!navigator?.canShare && !navigator?.clipboard) {
    return null;
  }

  return (
    <PostActionButton
      actionName="Share"
      onClick={sharePost}
      className="text-brand-blue-600"
      icon={EIcons.EXTERNAL}
    />
  );
}
export default PostCard;
