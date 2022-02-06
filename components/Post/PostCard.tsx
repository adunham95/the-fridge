import IconComment from '../Icons/Icon-Comment';
import IconHeart from '../Icons/Icon-Heart';
import IconPlane from '../Icons/Icon-Plane';
import Comments from './Comments';
import theme from '../../theme/theme.json';
import { EPostPermission, IPost } from '../../models/PostModel';
import { Avatar } from '../Avatar/Avatar';
import { useSession } from 'next-auth/react';

function PostCard({
  description = '',
  permissions = [],
  comments = [],
  likedBy = [],
  postedBy,
  image = 'https://picsum.photos/200/300',
  dateTime,
}: IPost) {
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
    <div className="mb-3 pb-1">
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
        {image && (
          <div className="w-full px-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/200/300"
              className="w-full rounded-md"
            />
          </div>
        )}
        <div className="p-2 flex w-full justify-start">
          <PostLikes likes={likedBy} />
          <div className="flex items-center pl-3">
            <IconComment
              width={15}
              height={15}
              fill={theme.COLORS.brand[400]}
            />
            <span className=" ml-1 text-sm">{comments.length}</span>
          </div>
          {/* <button
            className={`flex`}
            disabled={!permissions.includes(EPostPermission.ALLOW_SHARE)}
          >
            <IconPlane
              width={15}
              height={15}
              fill={
                permissions.includes(EPostPermission.ALLOW_COMMENT)
                  ? theme.COLORS.share[400]
                  : 'grey'
              }
            />
          </button> */}
        </div>
      </div>
      <div>
        <div>
          <Comments
            comments={comments}
            limit={2}
            allowComment={permissions.includes(EPostPermission.ALLOW_COMMENT)}
          />
        </div>
      </div>
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
