import IconComment from '../Icons/Icon-Comment';
import IconHeart from '../Icons/Icon-Heart';
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
import { useManualQuery, useQuery } from 'graphql-hooks';
import { GET_COMMENT_BY_POST } from '../../graphql/query/getCommentsByPost';
import { useToast } from '../Toast/ToastContext';
import { loadComponents } from 'next/dist/server/load-components';
import { Loader } from '../Loader/Loader';
import { usePost } from '../../context/PostContext';
import { POST_ACTION } from '../../reducers/postReducer';

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

  return (
    <div className="mb-3 pb-1" id={id}>
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-2">
          <div className="flex items-center">
            <Avatar name={postedBy.name} />
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
        <div className="p-2 flex w-full justify-start">
          <PostLikes likes={likedBy} postID={id} />
          <button
            onClick={() => setModalID(`${id}-comments`)}
            className="flex items-center pl-3"
          >
            <IconComment
              width={15}
              height={15}
              fill={theme.COLORS.brand[400]}
            />
            <span className=" ml-1 text-sm">{comments.length}</span>
          </button>
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
      addToast('Could not load comments');
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
  const { data: session } = useSession();
  const myUser = session?.user;
  const { dispatch } = usePost();

  async function updateLike() {
    dispatch({
      type: POST_ACTION.UPDATE_LIKE,
      payload: {
        userID: myUser?.id || '',
        postID,
      },
    });
  }

  return (
    <button className="flex items-center" onClick={updateLike}>
      <IconHeart
        width={15}
        height={15}
        fill={likes.includes(myUser?.id || '') ? 'red' : 'pink'}
      />
      <span className=" ml-1 text-sm">{likes.length}</span>
    </button>
  );
}
export default PostCard;
