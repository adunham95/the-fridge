import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GET_POSTS_BY_GROUP } from '../apiData/query/getPostsByGroup';
import Layout from '../components/Layout/Layout';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import { IPost } from '../models/PostModel';

const Wall = () => {
  const { data: session } = useSession();
  const [fetchPosts, { loading }] = useManualQuery(GET_POSTS_BY_GROUP);
  const myUser = session?.user;
  const [posts, setPosts] = useState([]);

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

    setPosts(data?.data?.getPostsByGroup || []);
  };

  return (
    <Layout>
      <div className=" max-w-md mx-auto">
        <NewPost />
        {loading && <h1>Loading...</h1>}
        {posts.map((p: IPost) => (
          <PostCard key={p.id} {...p} />
        ))}
        {!loading && posts.length === 0 && <h1>No Posts</h1>}
      </div>
    </Layout>
  );
};

Wall.auth = true;

export default Wall;
