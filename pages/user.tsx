import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import PostCard from '../components/Post/PostCard';
import { EPostPermission, IPost } from '../models/PostModel';

const posts: Array<IPost> = [
  {
    id: 'adrian',
    dateTime: '1643110854416',
    likedBy: ['adrian', 'emelie'],
    comments: [
      {
        id: 'commentOne',
        message: 'Test Message',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
      {
        id: 'commentTwo',
        message: 'Test Message Two',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
      {
        id: 'commentThree',
        message: 'Test Message Three',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
    ],
    permissions: [EPostPermission.ALLOW_COMMENT, EPostPermission.ALLOW_SHARE],
    postedBy: {
      id: 'Adrian',
      name: 'Adrian Dunham',
    },
  },
  {
    id: 'annabelle',
    dateTime: '1643110854416',
    likedBy: ['adrian'],
    comments: [
      {
        id: 'commentFour',
        message:
          'Test Message Four. This is a super long comment. That I have on this set of text. It has a very long string. I have alot of words. Annabelle is a very good girl. ',
        postID: 'adrian',
        dateTime: '1643110854416',
        commentAuthor: {
          id: 'Adrian',
          name: 'Adrian Dunham',
        },
      },
    ],
    permissions: [EPostPermission.ALLOW_SHARE],
    postedBy: {
      id: 'Emelie',
      name: 'Emelie Dunham',
    },
  },
  {
    id: 'emelie',
    dateTime: '1643110854316',
    likedBy: ['annabelle'],
    comments: [],
    permissions: [],
    postedBy: {
      id: 'Annabelle',
      name: 'Annabelle Dunham',
    },
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
