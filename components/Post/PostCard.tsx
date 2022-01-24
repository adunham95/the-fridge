import IconComment from '../Icons/Icon-Comment';
import IconHeart from '../Icons/Icon-Heart';

export interface IPost {
  id: string;
  dateTime: string;
  description?: string;
  image?: string;
  likedBy: Array<string>;
  comments: Array<IComment>;
  permissions: Array<EPostPermission>;
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
  image = 'https://picsum.photos/200/300',
}: IPost) {
  return (
    <div>
      <div className="bg-white shadow-md rounded">
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
            <IconComment width={28} height={28} />
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
            className={`flex ${
              permissions.includes(EPostPermission.ALLOW_SHARE)
                ? 'text-green-500'
                : 'text-gray-400'
            }`}
            disabled={!permissions.includes(EPostPermission.ALLOW_SHARE)}
          >
            Share
          </button>
        </div>
      </div>
      <div>
        {permissions.includes(EPostPermission.ALLOW_COMMENT) ? (
          <div>
            <span>comment</span>
          </div>
        ) : (
          <div className="text-center">No Comments Allowed</div>
        )}
      </div>
    </div>
  );
}
export default PostCard;
