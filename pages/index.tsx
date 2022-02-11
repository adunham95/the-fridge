import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { GET_POSTS_BY_GROUP } from '../graphql/query/getPostsByGroup';
import Layout from '../components/Layout/Layout';
import { Loader } from '../components/Loader/Loader';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import { usePost } from '../context/PostContext';
import { IPost } from '../models/PostModel';
import { POST_ACTION } from '../reducers/postReducer';
import { EToastType, useToast } from '../components/Toast/ToastContext';

const Wall = () => {
  const { data: session } = useSession();
  const [fetchPosts, { loading }] = useManualQuery(GET_POSTS_BY_GROUP);
  const myUser = session?.user;
  const { state, dispatch } = usePost();
  const { addToast } = useToast();

  useEffect(() => {
    const myGroups = myUser?.orgs.map((o) => o.group.id);
    console.log('myGroups', myGroups);
    fetchPostData(myGroups || []);
  }, [myUser]);

  const fetchPostData = async (groupList: Array<string>) => {
    const data = await fetchPosts({
      variables: {
        ids: groupList,
      },
    });
    console.log(data.data);
    if (data.data?.getPostsByGroup) {
      dispatch({
        type: POST_ACTION.SET_POSTS,
        payload: {
          posts: data?.data.getPostsByGroup || [],
        },
      });
    }
    if (data.error) {
      addToast('Error Fetching Posts', EToastType.ERROR);
    }
  };

  const newPost = (post: IPost) => {
    dispatch({
      type: POST_ACTION.ADD_POST,
      payload: {
        post,
      },
    });
  };

  return (
    <Layout>
      <div className=" max-w-md mx-auto py-5">
        <NewPost onCreate={newPost} />
        {loading && (
          <div className="flex justify-center pt-1 pb-2">
            <Loader />
          </div>
        )}
        {state.posts.map((p: IPost) => (
          <PostCard key={p.id} {...p} />
        ))}
        {!loading && state.posts.length === 0 && <h1>No Posts</h1>}
      </div>
    </Layout>
  );
};

Wall.auth = true;

export default Wall;
