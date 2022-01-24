import IconComment from '../Icons/Icon-Comment';
import IconHeart from '../Icons/Icon-Heart';
import IconPlane from '../Icons/Icon-Plane';
import Comments from './Comments';

export interface IPost {
  id: string;
  dateTime: string;
  description?: string;
  image?: string;
  postedBy: IUser;
  likedBy: Array<string>;
  comments: Array<IComment>;
  permissions: Array<EPostPermission>;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IComment {
  id: string;
  message: string;
  dateTime: string;
  postID: string;
  parentComment: string;
}

export enum EPostPermission {
  ALLOW_SHARE = 'allowShare',
  ALLOW_COMMENT = 'allowComment',
}

function PostCard({
  description = '',
  permissions = [],
  comments = [],
  postedBy = {
    id: 'adrian',
    name: 'Adrian Dunham',
  },
  image = 'https://picsum.photos/200/300',
}: IPost) {
  return (
    <div className="mb-3 border-b-2 border-gray-200 pb-1">
      <div className="bg-white">
        <div className="p-2">
          <div className="flex items-center">
            <span className=" h-8 w-8 rounded-full bg-blue-400 inline-flex justify-center items-center mr-1 text-white">
              {postedBy.name[0]}
            </span>
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
                  ? 'blue'
                  : 'grey'
              }
            />
            <span className=" ml-2 text-lg">
              {permissions.includes(EPostPermission.ALLOW_COMMENT)
                ? comments.length
                : 'N/A'}
            </span>
          </div>
          <button className="flex">
            <IconHeart width={28} height={28} fill="red" />
            <span className=" ml-2 text-lg">5</span>
          </button>
          <button
            className={`flex`}
            disabled={!permissions.includes(EPostPermission.ALLOW_SHARE)}
          >
            <IconPlane
              width={28}
              height={28}
              fill={
                permissions.includes(EPostPermission.ALLOW_COMMENT)
                  ? 'blue'
                  : 'grey'
              }
            />
          </button>
        </div>
      </div>
      <div>
        {permissions.includes(EPostPermission.ALLOW_COMMENT) ? (
          <div>
            <Comments comments={comments} />
          </div>
        ) : (
          <div className="text-center">No Comments Allowed</div>
        )}
      </div>
    </div>
  );
}
export default PostCard;
