// @flow
import { useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import * as React from 'react';
import { GET_SINGLE_POST_BY_ID } from '../../graphql/query/getSingePostById';
import { Avatar } from '../../components/Avatar/Avatar';
import { Loader } from '../../components/Loader/Loader';
import { useToast } from '../../components/Toast/ToastContext';
import { IPost } from '../../models/PostModel';
import { formatDate } from '../../util/formatData';
import { ImageCarousel } from '../../components/Image/ImageCarousel';
import theme from '../../theme/theme.json';
import { EIcons } from '../../components/Icons';
import { EUserPermissions } from '../../models/UserModel';
import Comments from '../../components/Post/Comments';
import { PostLikers, PostLikes } from '../../components/Post/PostLikes';

function SinglePost() {
  const router = useRouter();
  const { id } = router.query;
  const [fetchPost, { loading }] = useManualQuery(GET_SINGLE_POST_BY_ID);
  const { addToast } = useToast();
  const [post, setPost] = React.useState<IPost | null>();

  React.useEffect(() => {
    console.log(id);
    if (typeof id === 'string' && id !== '') {
      fetchPostData(id);
    }
  }, [id]);

  const fetchPostData = async (id: string) => {
    const data = await fetchPost({
      variables: {
        id,
      },
    });
    console.log(data.data);
    if (data.data.getSinglePost === null) {
      addToast(
        'Could not find Post',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
      setPost(null);
    }
    if (data.data.getSinglePost !== null) {
      console.log(data.data.getSingePostById);
      setPost(data.data.getSinglePost);
    }
  };

  console.log(post?.dateTime);

  return (
    <div className="p-2 flex items-center flex-col">
      {loading && (
        <div className="pt-2">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="w-full max-w-[500px] flex flex-col items-center py-3">
          {post === null ? (
            <p>Error Loading Post</p>
          ) : (
            <>
              <div className="flex w-full items-center">
                <Avatar name={post?.postedBy.name} />
                <div className="text-sm pl-1">
                  <p>{post?.postedBy.name}</p>
                  <p>{formatDate(post?.dateTime)}</p>
                </div>
              </div>
              {post?.description && (
                <p className="text-lg text-left w-full m-2 text-slate-700">
                  {post?.description}
                </p>
              )}
              <div className="bg-white shadow-sm rounded-lg">
                {post?.image && <ImageCarousel images={post.image} />}
              </div>
              <div className="pt-2 px-2 flex w-full">
                <PostLikes
                  likes={post?.likedBy || []}
                  postID={post?.id || ''}
                />
              </div>
              <PostLikers
                orgID={post?.org?.id || ''}
                likers={post?.likedBy || []}
              />
            </>
          )}
        </div>
      )}
      {post?.comments && (
        <div className="w-full max-w-[500px]">
          <Comments
            comments={post.comments}
            postID={post.id}
            orgID={post?.org?.id}
            permissions={post.permissions}
          />
        </div>
      )}
    </div>
  );
}

SinglePost.Auth = true;
SinglePost.permissions = [EUserPermissions.CAN_VIEW_POST];

export default SinglePost;
