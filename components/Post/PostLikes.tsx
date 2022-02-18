import { useMutation } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { usePost } from '../../context/PostContext';
import { UPDATE_LIKE } from '../../graphql/mutation/updateLike';
import { POST_ACTION } from '../../reducers/postReducer';
import { EIcons } from '../Icons';
import { useToast } from '../Toast/ToastContext';
import { PostActionButton } from './PostAction';
import theme from '../../theme/theme.json';

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
