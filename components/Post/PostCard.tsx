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
    <div className="mb-3 border-b-2 border-gray-200 pb-1">
      <div className="bg-white">
        <div className="p-2">
          <div className="flex items-center">
            <Avatar name={postedBy.name} />
            {postedBy.name}
          </div>
          <div className=" text-slate-600 text-sm">{formatDate(dateTime)}</div>
        </div>
        {image && (
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/200/300" className="w-full" />
          </div>
        )}
        {description !== '' && (
          <div className="px-2">
            <span>{description}</span>
          </div>
        )}
        <div className="p-2 flex w-full justify-between">
          <div className="flex">
            <IconComment
              width={28}
              height={28}
              fill={
                permissions.includes(EPostPermission.ALLOW_COMMENT)
                  ? theme.COLORS.share[400]
                  : 'grey'
              }
            />
            <span className=" ml-2 text-lg">{comments.length}</span>
          </div>
          <PostLikes likes={likedBy} />
          <button
            className={`flex`}
            disabled={!permissions.includes(EPostPermission.ALLOW_SHARE)}
          >
            <IconPlane
              width={28}
              height={28}
              fill={
                permissions.includes(EPostPermission.ALLOW_COMMENT)
                  ? theme.COLORS.share[400]
                  : 'grey'
              }
            />
          </button>
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
    <button className="flex">
      <IconHeart
        width={28}
        height={28}
        fill={likes.includes(myUser?.id || '') ? 'red' : 'pink'}
      />
      <span className=" ml-2 text-lg">{likes.length}</span>
    </button>
  );
}
export default PostCard;
