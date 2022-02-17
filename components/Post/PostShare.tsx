import { generateURLOrigin } from '../../util/url';
import { useToast } from '../Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../Icons';
import { PostActionButton } from './PostAction';

interface IPostShare {
  postID: string;
}

export function PostShare({ postID }: IPostShare) {
  const { addToast } = useToast();

  async function sharePost() {
    const url = `${generateURLOrigin()}/post/${postID}`;
    const shareData = {
      title: 'View Post',
      text: 'View Post on the fridge',
      url,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (navigator?.canShare) {
      try {
        await navigator.share(shareData);
        console.log('shared link');
        addToast('Link Shared', theme.BASE_COLOR['brand-blue']);
        // resultPara.textContent = 'MDN shared successfully'
      } catch (err) {
        console.log('Could not share');
        addToast(
          'Failed to share link',
          theme.BASE_COLOR.error,
          EIcons.EXCLAMATION,
        );
        // resultPara.textContent = 'Error: ' + err
      }
    } else if (navigator?.clipboard) {
      await navigator.clipboard.writeText(url);
      addToast('Link Copied', theme.BASE_COLOR['brand-blue']);
    } else {
      console.log(`Your system doesn't support sharing`);
    }
  }

  if (!navigator?.canShare && !navigator?.clipboard) {
    return null;
  }

  return (
    <PostActionButton
      actionName="Share"
      onClick={sharePost}
      className="text-brand-blue-600"
      icon={EIcons.EXTERNAL}
    />
  );
}
