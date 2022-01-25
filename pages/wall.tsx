import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import { useAppSelector } from '../hooks/hooks';

const User: NextPage = () => {
  const posts = useAppSelector((state) => state.posts);
  return (
    <Layout>
      <div className=" max-w-md mx-auto">
        <NewPost />
        {posts.map((p) => (
          <PostCard key={p.id} {...p} />
        ))}
      </div>
    </Layout>
  );
};

export default User;
