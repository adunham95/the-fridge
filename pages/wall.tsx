import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { GET_POSTS_BY_GROUP } from '../apiData/query/getPostsByGroup';
import Layout from '../components/Layout/Layout';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import { usePost } from '../context/PostContext';
import { IPost } from '../models/PostModel';
import { POST_ACTION } from '../reducers/postReducer';

const Wall = () => {
  const { data: session } = useSession();
  const [fetchPosts, { loading }] = useManualQuery(GET_POSTS_BY_GROUP);
  const myUser = session?.user;
  const { state, dispatch } = usePost();

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
    dispatch({
      type: POST_ACTION.SET_POSTS,
      payload: {
        posts: data?.data.getPostsByGroup || [],
      },
    });
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
      <div className=" max-w-md mx-auto">
        <NewPost onCreate={newPost} />
        {loading && <h1>Loading...</h1>}
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
