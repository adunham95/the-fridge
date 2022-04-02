import { useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useState, useEffect, FormEvent } from 'react';
import { usePost } from '../../context/PostContext';
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutation/createComment';
import { IComment } from '../../models/CommentModel';
import { POST_ACTION } from '../../reducers/postReducer';
import { Avatar } from '../Avatar/Avatar';
import { Button, EButtonStyle } from '../StatelessInput/Button';
import { Input } from '../StatelessInput/Input';
import { useToast } from '../Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../Icons';
import { usePermissions } from '../../hooks/usePermissions';
import { EUserPermissions } from '../../models/UserModel';
import { EPostPermission } from '../../models/PostModel';

interface IProps {
  postID: string;
  orgID: string;
  permissions: Array<string>;
  comments: Array<IComment>;
  limit?: number | null;
  allowComment?: boolean;
  individual?: boolean;
  onCommentUpdate?: (comment: IComment) => void;
}

const Comments = ({
  postID,
  orgID = '',
  comments = [],
  permissions = [],
  limit,
  allowComment = false,
  individual = false,
  onCommentUpdate = () => {},
}: IProps) => {
  const [filteredComments, setFilteredComments] = useState<Array<IComment>>([]);
  const { userHasPermissions } = usePermissions();

  useEffect(() => {
    setFilteredComments(limit ? comments.slice(0, limit) : comments);
  }, [comments]);

  function addComment(newComment: IComment) {
    onCommentUpdate(newComment);
    setFilteredComments([...filteredComments, newComment]);
  }

  function setStyleType() {
    if (individual) {
      return 'bg-white rounded-md shadow-md mb-2';
    }
    if (!individual) {
      return 'mb-1';
    }
  }
  return (
    <div className="px-2 w-full max-h-half-screen overflow-y-auto">
      {filteredComments.length === 0 && (
        <p className="text-center text-sm p-1">No Comments</p>
      )}
      {filteredComments.map((c) => (
        <div
          key={c.id}
          className={`text-sm p-1  w-full flex ${setStyleType()}`}
        >
          <Avatar name={c.author.name} />
          <div className=" bg-slate-400 text-white w-full rounded-md p-2">
            <p className=" font-bold uppercase">{c.author.name}</p>
            <p>{c.message}</p>
          </div>
        </div>
      ))}
      {userHasPermissions({
        orgID,
        hasPermissions: [EUserPermissions.CAN_COMMENT],
        hasNotPermissions: [EPostPermission.DISALLOW_COMMENT],
        additionalPermissions: permissions,
      }) && (
        <NewComment
          postID={postID}
          onSave={(newComment) => addComment(newComment)}
        />
      )}
    </div>
  );
};

interface INewCommentProps {
  postID: string;
  onSave: (newComment: IComment) => void;
}

function NewComment({ postID, onSave }: INewCommentProps) {
  const [comment, setComment] = useState('');
  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION);
  const { addToast } = useToast();
  const { state, dispatch } = usePost();
  const { data: session } = useSession();
  const myUser = session?.user;

  async function createNewComment(e: FormEvent) {
    e.preventDefault();
    const newCommentData = {
      newComment: {
        message: comment,
        author: myUser?.id,
        postID,
      },
    };
    const data = await createComment({ variables: newCommentData });
    if (data?.error) {
      addToast(
        'Error posting comment',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
    }
    if (data?.data.createComment) {
      addToast('Created comment', theme.BASE_COLOR.success, EIcons.BELL);
      onSave(data.data.createComment);
      setComment('');
      dispatch({
        type: POST_ACTION.ADD_COMMENT,
        payload: {
          comment: data.data.createComment,
          postID,
        },
      });
    }
  }

  return (
    <div className="sticky bottom-0 py-1 px-1">
      <form className="flex" onSubmit={createNewComment}>
        <Input
          id="new-comment"
          placeholder="Write Comment"
          value={comment}
          required
          onChange={(e) => setComment(e)}
          containerClass={'w-full h-full pr-1'}
        />
        <Button
          onClick={() => {}}
          disabled={comment === ''}
          type="submit"
          size={'sm'}
          buttonStyle={EButtonStyle.SUCCESS}
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default Comments;
