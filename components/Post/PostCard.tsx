import IconComment from '../Icons/Icon-Comment';
import IconHeart from '../Icons/Icon-Heart';
import IconPlane from '../Icons/Icon-Plane';
import Comments from './Comments';
import theme from '../../theme/theme.json';
import { EPostPermission, IPost } from '../../models/PostModel';
import { Avatar } from '../Avatar/Avatar';
import { IUser } from '../../models/UserModel';

const myUser: IUser = {
  id: 'adrian',
  name: 'Adrian Dunham',
  permissions: [],
};

function PostCard({
  description = '',
  permissions = [],
  comments = [],
  likedBy = [],
  postedBy = {
    id: 'adrian',
    name: 'Adrian Dunham',
    permissions: [],
  },
  image = 'https://picsum.photos/200/300',
}: IPost) {
  return (
    <div className="mb-3 border-b-2 border-gray-200 pb-1">
      <div className="bg-white">
        <div className="p-2">
          <div className="flex items-center">
            <Avatar name={postedBy.name} />
            {postedBy.name}
          </div>
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
          {/* <button className="flex">
            <IconHeart width={28} height={28} fill="red" />
            <span className=" ml-2 text-lg">{likedBy.length}</span>
          </button> */}
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
  return (
    <button className="flex">
      <IconHeart
        width={28}
        height={28}
        fill={likes.includes(myUser.id) ? 'red' : 'pink'}
      />
      <span className=" ml-2 text-lg">{likes.length}</span>
    </button>
  );
}
export default PostCard;
