// @flow
import { useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import * as React from 'react';
import { GET_SINGLE_POST_BY_ID } from '../../graphql/query/getSingePostById';
import { Avatar } from '../../components/Avatar/Avatar';
import Layout from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { useToast } from '../../components/Toast/ToastContext';
import { IPost } from '../../models/PostModel';
import { formatDate } from '../../util/formatData';
import { ImageCarousel } from '../../components/Image/ImageCarousel';
import { Input } from '../../components/StatelessInput/Input';

function SinglePost() {
  const router = useRouter();
  const { id } = router.query;
  const [fetchPost, { loading }] = useManualQuery(GET_SINGLE_POST_BY_ID);
  const { addToast } = useToast();
  const [post, setPost] = React.useState<IPost | null>();

  const testComments = [
    { message: 'Test Comment', author: 'Adrian' },
    { message: 'Emelies Comment', author: 'Emelie' },
  ];

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
      addToast('Could not find Post');
      setPost(null);
    }
    if (data.data.getSinglePost !== null) {
      setPost(data.data.getSinglePost);
    }
  };

  return (
    <Layout>
      <div className="p-2 flex items-center flex-col">
        {loading && (
          <div className="pt-2">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="bg-white w-[500px] flex flex-col items-center shadow-sm rounded-lg px-4 py-3">
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
                {post?.image && <ImageCarousel images={post.image} />}
              </>
            )}
          </div>
        )}
        {post?.comments && (
          <div>
            <div>New COmment</div>
          </div>
        )}
      </div>
    </Layout>
  );
}

SinglePost.Auth = true;

export default SinglePost;
