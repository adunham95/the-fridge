import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import queryGraphql from '../shared/query-graphql';

const Wall: NextPage = ({ props }) => {
  const posts = props?.posts || [];
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

Wall.getInitialProps = async (ctx) => {
  const data = await queryGraphql(
    `
    {getPosts{
      id
      description
      image
      orgID
      orgName
      viewByGroups
      postedBy{
        name
        id
      }
      likedBy
      comments{
        id
        parentComment
        message
        commentAuthor{
          id
          name
        }
      }
    }}
  `,
  );
  return {
    props: {
      posts: data.getPosts,
    },
  };
};

export default Wall;
