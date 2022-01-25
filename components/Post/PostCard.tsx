import IconComment from '../Icons/Icon-Comment';
import IconHeart from '../Icons/Icon-Heart';
import IconPlane from '../Icons/Icon-Plane';
import Comments from './Comments';
import theme from '../../theme/theme.json';
import { EPostPermission, IPost } from '../../models/PostModel';

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
                  ? theme.COLORS.share[400]
                  : 'grey'
              }
            />
            <span className=" ml-2 text-lg">{comments.length}</span>
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
export default PostCard;
