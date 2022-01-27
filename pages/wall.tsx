import Layout from '../components/Layout/Layout';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import { IPost } from '../models/PostModel';
import queryGraphql from '../shared/query-graphql';

interface IProps {
  posts: Array<IPost>;
}

const Wall = ({ posts }: IProps) => {
  console.log(posts);
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
    query allPosts{
      getPosts{
        id
        description
        image
        dateTime
        org{
          id
          name
        }
        viewByGroups
        postedBy{
          name
          id
        }
        likedBy
        comments{
          id
          message
          dateTime
          author{
            name
            id
          }
        }
      }
    }
  `,
  );
  return {
    props: {
      posts: data.getPosts,
    },
  };
}

export default Wall;
