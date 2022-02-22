import { useMutation, useQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { usePost } from '../../context/PostContext';
import { UPDATE_LIKE } from '../../graphql/mutation/updateLike';
import { POST_ACTION } from '../../reducers/postReducer';
import { EIcons } from '../Icons';
import { useToast } from '../Toast/ToastContext';
import { PostActionButton } from './PostAction';
import theme from '../../theme/theme.json';
import { usePermissions } from '../../hooks/usePermissions';
import { EUserPermissions, IUser } from '../../models/UserModel';
import { GET_USERS_BY_LIST } from '../../graphql/query/getUsersByList';
import { Avatar } from '../Avatar/Avatar';
import { useState } from 'react';

interface IPostLikeProps {
  likes: Array<string>;
  postID: string;
  className?: string;
}

export function PostLikes({ likes, postID, className = '' }: IPostLikeProps) {
  const [createLike, { loading }] = useMutation(UPDATE_LIKE);
  const { addToast } = useToast();
  const { data: session } = useSession();
  const myUser = session?.user;
  const { dispatch } = usePost();

  async function updateLike() {
    const data = await createLike({
      variables: {
        likeInput: {
          userID: myUser?.id || '',
          postID,
          action: likes.includes(myUser?.id || '') ? 'remove' : 'add',
        },
      },
    });
    if (data.error || data?.data?.updateLike?.success === false) {
      addToast(
        'Error updating like',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
    }
    if (data?.data?.updateLike?.success) {
      addToast('Updated Like', theme.BASE_COLOR.success, EIcons.THUMB_UP);
      dispatch({
        type: POST_ACTION.UPDATE_LIKE,
        payload: {
          userID: myUser?.id || '',
          postID,
        },
      });
    }
  }

  return (
    <PostActionButton
      actionName="Like"
      onClick={updateLike}
      icon={EIcons.HEART}
      className={`${className} ${
        likes.includes(myUser?.id || '') ? 'text-red-500' : 'text-pink-300'
      }`}
    >
      <span className=" ml-1">{likes.length}</span>
    </PostActionButton>
  );
}

type Props = {
  likers: Array<string>,
  orgID: string,
};
export function PostLikers({ likers, orgID }: Props) {
  const { userHasPermissions } = usePermissions();
  const [isOver, setIsOver] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const { loading, error, data } = useQuery(GET_USERS_BY_LIST, {
    variables: {
      ids: likers,
    },
  });

  console.log(data?.getUsersByList);

  return userHasPermissions({
    orgID,
    hasPermissions: [EUserPermissions.CAN_VIEW_LIKERS],
  }) ? (
    <div
      className="flex w-full py-1"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {data?.getUsersByList.map((user: IUser) => (
        <span
          key={user.id}
          className={`relative first-of-type:ml-0 transition-all ${
            isExpanded ? '-ml-1' : '-ml-[2.5%]'
          } cursor-default`}
        >
          <Avatar
            name={user.name}
            color={user.accountColor}
            mouseToggle={(over) => setIsOver(over ? user.id : '')}
            className="bg-white border-2 border-white"
          />
          {isOver === user.id && (
            <span className="absolute text-[10px] whitespace-nowrap bottom-[-80%] left-[50%] translate-x-[-50%] rounded bg-slate-500 text-white p-1">
              {user.name}
            </span>
          )}
        </span>
      ))}
    </div>
  ) : null;
}
