import { IComment } from '../../models/CommentModel';

interface IProps {
  comments: Array<IComment>;
  limit?: number | null;
  allowComment?: boolean;
}

const Comments = ({ comments = [], limit, allowComment = false }: IProps) => {
  const filteredComments = limit ? comments.slice(0, limit) : comments;
  return (
    <>
      {filteredComments.map((c) => (
        <div key={c.id} className="text-xs pb-1">
          <span className=" font-bold">{c.commentAuthor.name}: </span>
          <span>{c.message}</span>
        </div>
      ))}
    </>
  );
};

export default Comments;
