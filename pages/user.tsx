import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import PostCard, { EPostPermission, IPost } from '../components/Post/PostCard';

const posts: Array<IPost> = [
  {
    id: 'adrian',
    dateTime: '14:58:01 GMT-0500 (Eastern Standard Time)',
    likedBy: ['adrian', 'emelie'],
    comments: [],
    permissions: [EPostPermission.ALLOW_COMMENT, EPostPermission.ALLOW_SHARE],
  },
  {
    id: 'annabelle',
    dateTime: '16:58:01 GMT-0500 (Eastern Standard Time)',
    likedBy: ['adrian'],
    comments: [],
    permissions: [EPostPermission.ALLOW_SHARE],
  },
  {
    id: 'emelie',
    dateTime: '17:48:01 GMT-0500 (Eastern Standard Time)',
    likedBy: ['annabelle'],
    comments: [],
    permissions: [],
  },
];

const User: NextPage = () => {
  return (
    <Layout>
      <>
        <h1>User</h1>
        <div className=" max-w-md mx-auto">
          {posts.map((p) => (
            <PostCard key={p.id} {...p} />
          ))}
        </div>
      </>
    </Layout>
  );
};

export default User;
