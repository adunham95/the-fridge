import { IComment } from './PostCard';

interface IProps {
  comments: Array<IComment>;
  limit?: number | null;
}

const Comments = ({ comments = [], limit }: IProps) => {
  return <>Comments</>;
};

export default Comments;
