import Layout from '../components/Layout/Layout';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import { IPost } from '../models/PostModel';
import queryGraphql from '../shared/query-graphql';

interface IProps {
  posts: Array<IPost>;
}

const Wall = ({ posts }: IProps) => {
  return (
    <Layout>
      <div className=" max-w-md mx-auto">
        <NewPost />
        {posts.map((p: IPost) => (
          <PostCard key={p.id} {...p} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
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
}

export default Wall;
