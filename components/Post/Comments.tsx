import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { IComment } from '../../models/CommentModel';
import { Avatar } from '../Avatar/Avatar';

interface IProps {
  comments: Array<IComment>;
  limit?: number | null;
  allowComment?: boolean;
}

const Comments = ({ comments = [], limit, allowComment = false }: IProps) => {
  const filteredComments = limit ? comments.slice(0, limit) : comments;
  return (
    <div className="px-2">
      {filteredComments.map((c) => (
        <div key={c.id} className="text-xs pb-1">
          <span className=" font-bold">{c.author.name}: </span>
          <span>{c.message}</span>
        </div>
      ))}
      {allowComment && <NewComment />}
    </div>
  );
};

function NewComment() {
  const [comment, setComment] = useState('');
  const {
    data: { user: myUser },
  } = useSession();

  return (
    <div className="flex">
      <Avatar name={myUser?.name || 'A'} />
      <input
        onChange={(e) => setComment(e.target.value)}
        className="w-full border-b-2 border-black"
      />
      <button
        className={`${comment === '' ? 'text-gray-400' : 'text-green-500'}`}
      >
        Post
      </button>
    </div>
  );
}

export default Comments;
