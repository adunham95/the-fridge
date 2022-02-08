import { useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutation/createComment';
import { IComment } from '../../models/CommentModel';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../StatelessInput/Button';
import { useToast } from '../Toast/ToastContext';

interface IProps {
  postID: string;
  comments: Array<IComment>;
  limit?: number | null;
  allowComment?: boolean;
  individual?: boolean;
}

const Comments = ({
  postID,
  comments = [],
  limit,
  allowComment = false,
  individual = false,
}: IProps) => {
  const [filteredComments, setFilteredComments] = useState<Array<IComment>>([]);

  useEffect(() => {
    setFilteredComments(limit ? comments.slice(0, limit) : comments);
  }, [comments]);

  function addComment(newComment: IComment) {
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
          className={`text-sm p-1 bg-white w-full flex ${setStyleType()}`}
        >
          <Avatar name={c.author.name} />
          <div className=" bg-slate-400 text-white w-full rounded-md p-2">
            <p className=" font-bold uppercase">{c.author.name}</p>
            <p>{c.message}</p>
          </div>
        </div>
      ))}
      {allowComment && (
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
  const { data: session } = useSession();
  const myUser = session?.user;

  async function createNewComment() {
    const newCommentData = {
      newComment: {
        message: comment,
        author: myUser?.id,
        postID,
      },
    };
    console.log(newCommentData);
    const data = await createComment({ variables: newCommentData });
    console.log(data);
    if (data?.error) {
      addToast('Error posting comment');
    }
    if (data?.data.createComment) {
      addToast('Created comment');
      onSave(data.data.createComment);
      setComment('');
    }
  }

  return (
    <div className="flex sticky bottom-0 bg-white py-1 px-1">
      <input
        placeholder="Write Comment"
        onChange={(e) => setComment(e.target.value)}
        className="w-full border-b-2 mx-1 border-black text-sm"
      />
      <Button
        onClick={createNewComment}
        size={'sm'}
        className={`text-white ${
          comment === '' ? 'bg-gray-400' : 'bg-emerald-500'
        }`}
      >
        Post
      </Button>
    </div>
  );
}

export default Comments;
