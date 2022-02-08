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
import { useManualQuery } from 'graphql-hooks';
import { GET_COMMENT_BY_POST } from '../../apiData/query/getCommentsByPost';
import { useToast } from '../Toast/ToastContext';
import { loadComponents } from 'next/dist/server/load-components';
import { Loader } from '../Loader/Loader';

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
          <PostLikes likes={likedBy} />
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
  const [fetchComments, { loading }] = useManualQuery(GET_COMMENT_BY_POST);
  const { addToast } = useToast();

  useEffect(() => {
    console.log('postID', postID);
    loadComments();
  }, [postID]);

  async function loadComments() {
    const data = await fetchComments({
      variables: {
        id: postID,
      },
    });
    console.log(data.data);
    if (data.data.getCommentsByPost === null) {
      addToast('Could not load comments');
      setComments([]);
    }
    if (data.data.getCommentsByPost !== null) {
      setComments(data.data.getCommentsByPost);
    }
  }

  return (
    <div className=" pt-1 pb-1 w-full bg-white rounded-t-md">
      <p className="mx-2 border-b border-slate-200">Comments</p>
      {loading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      <Comments comments={comments} allowComment />
    </div>
  );
}

interface IPostLikeProps {
  likes: Array<string>;
}

function PostLikes({ likes }: IPostLikeProps) {
  const { data: session } = useSession();
  const myUser = session?.user;
  return (
    <button className="flex items-center">
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
