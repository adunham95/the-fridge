import { useQuery } from 'graphql-hooks';
import { useEffect, useState } from 'react';
import { GET_COMMENT_BY_POST } from '../../graphql/query/getCommentsByPost';
import { IComment } from '../../models/CommentModel';
import { EIcons } from '../Icons';
import { Loader } from '../Loader/Loader';
import { useToast } from '../Toast/ToastContext';
import Comments from './Comments';
import theme from '../../theme/theme.json';
import { PostActionButton } from './PostAction';
import { useModal } from '../Modal/ModalContext';

interface IPostCommentButton {
  comments: Array<IComment>;
  id: string;
  className?: string;
}

export function PostCommentsButton({
  comments,
  id,
  className = '',
}: IPostCommentButton) {
  const { setModalID } = useModal();
  return (
    <PostActionButton
      onClick={() => setModalID(`${id}-comments`)}
      icon={EIcons.COMMENT}
      className={`${className} text-brand-400`}
      actionName="Comment"
    >
      <span className=" ml-1">{comments.length}</span>
    </PostActionButton>
  );
}

export function PostComments({ postID }: { postID: string }) {
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
