import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { IComment } from '../../models/CommentModel';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../StatelessInput/Button';

interface IProps {
  comments: Array<IComment>;
  limit?: number | null;
  allowComment?: boolean;
  individual?: boolean;
}

const Comments = ({
  comments = [],
  limit,
  allowComment = false,
  individual = false,
}: IProps) => {
  const filteredComments = limit ? comments.slice(0, limit) : comments;
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
      {allowComment && <NewComment />}
    </div>
  );
};

function NewComment() {
  const [comment, setComment] = useState('');
  const { data: session } = useSession();
  const myUser = session?.user;

  return (
    <div className="flex sticky bottom-0 bg-white py-1 px-1">
      <input
        placeholder="Write Comment"
        onChange={(e) => setComment(e.target.value)}
        className="w-full border-b-2 mx-1 border-black text-sm"
      />
      <Button
        onClick={() => console.log}
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
