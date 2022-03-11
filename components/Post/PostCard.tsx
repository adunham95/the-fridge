import { EPostPermission, IPost } from '../../models/PostModel';
import { Avatar } from '../Avatar/Avatar';
import { ImageCarousel } from '../Image/ImageCarousel';
import { useModal } from '../Modal/ModalContext';
import Modal from '../Modal/Modal';
import { EIcons } from '../Icons';
import { PostActionButton } from './PostAction';
import { PostLikes } from './PostLikes';
import { PostShare } from './PostShare';
import { PostComments } from './PostComments';
import { formatDate } from '../../util/formatData';
import { usePermissions } from '../../hooks/usePermissions';
import Link from 'next/link';
import { EUserPermissions } from '../../models/UserModel';
import { ImageSlider } from '../Image/ImageSlider';

function PostCard({
  id,
  description = '',
  permissions = [],
  comments = [],
  likedBy = [],
  postedBy,
  image = [],
  dateTime,
  org,
}: IPost) {
  const { setModalID } = useModal();
  const { userHasPermissions } = usePermissions();

  console.log(org.id);

  return (
    <div className="mb-3 pb-1" id={id}>
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-2">
          <Link
            passHref
            href={{
              pathname: '/post/[id]',
              query: { id },
            }}
          >
            <a className="flex items-center">
              <Avatar name={postedBy.name} color={postedBy.accountColor} />
              <div className="flex flex-col justify-start pl-1">
                <p>{postedBy.name}</p>
                <p className="text-slate-600 text-xs">{formatDate(dateTime)}</p>
              </div>
            </a>
          </Link>
        </div>
        {description !== '' && (
          <div className="px-2 pb-1">
            <span className=" text-slate-700">{description}</span>
          </div>
        )}
        {image.length > 0 && (
          <div className="w-full px-2 relative">
            {/* <ImageCarousel images={image} /> */}
            <ImageSlider images={image} />
          </div>
        )}
        <div className="p-2 flex w-full justify-start items-center">
          <PostLikes likes={likedBy} postID={id} />
          {userHasPermissions({
            orgID: org.id,
            hasNotPermissions: [EPostPermission.DISALLOW_COMMENT],
            additionalPermissions: permissions,
          }) && (
            <PostActionButton
              onClick={() => setModalID(`${id}-comments`)}
              icon={EIcons.COMMENT}
              className="text-brand-400"
              actionName="Comment"
            >
              <span className=" ml-1">{comments.length}</span>
            </PostActionButton>
          )}
          {userHasPermissions({
            orgID: org.id,
            additionalPermissions: permissions,
            hasPermissions: [
              EUserPermissions.CAN_SHARE,
              EPostPermission.ALLOW_SHARE,
              EPostPermission.IS_PUBLIC,
            ],
          }) && <PostShare postID={id} />}
        </div>
      </div>
      <Modal
        id={`${id}-comments`}
        position="center bottom"
        background="light"
        className="w-full sm:max-w-[500px] rounded-t-md"
        closeClassName="bg-rose-400 text-white hover:text-rose-700 rounded-full h-[1em] w-[1em] shadow-sm flex justify-center items-center right-1"
      >
        <PostComments postID={id} permissions={permissions} orgID={org.id} />
      </Modal>
    </div>
  );
}
export default PostCard;
