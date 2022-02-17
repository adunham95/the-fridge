import Comments from './Comments';
import theme from '../../theme/theme.json';
import { EPostPermission, IPost } from '../../models/PostModel';
import { Avatar } from '../Avatar/Avatar';
import { ImageCarousel } from '../Image/ImageCarousel';
import { useModal } from '../Modal/ModalContext';
import Modal from '../Modal/Modal';
import { IComment } from '../../models/CommentModel';
import { useEffect, useState } from 'react';
import { useQuery } from 'graphql-hooks';
import { GET_COMMENT_BY_POST } from '../../graphql/query/getCommentsByPost';
import { useToast } from '../Toast/ToastContext';
import { Loader } from '../Loader/Loader';
import { EIcons } from '../Icons';
import { PostActionButton } from './PostAction';
import { PostLikes } from './PostLikes';
import { PostShare } from './PostShare';

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
export default PostCard;
