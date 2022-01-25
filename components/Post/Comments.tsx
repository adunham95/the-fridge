import { useState } from 'react';
import { IComment } from '../../models/CommentModel';
import { IUser } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';

interface IProps {
  comments: Array<IComment>;
  limit?: number | null;
  allowComment?: boolean;
}

const myUser: IUser = {
  id: 'adrian',
  name: 'Adrian Dunham',
};

const Comments = ({ comments = [], limit, allowComment = false }: IProps) => {
  const filteredComments = limit ? comments.slice(0, limit) : comments;
  return (
    <div>
      {filteredComments.map((c) => (
        <div key={c.id} className="text-xs pb-1">
          <span className=" font-bold">{c.commentAuthor.name}: </span>
          <span>{c.message}</span>
        </div>
      ))}
      {allowComment && <NewComment />}
    </div>
  );
};

interface INewComment {
  newComment?: () => void;
}

function NewComment({ newComment }: INewComment) {
  const [comment, setComment] = useState('');
  return (
    <div className="flex">
      <Avatar name={myUser.name} />
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
