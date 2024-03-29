import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GET_POSTS_BY_GROUP_LIMIT_SKIP } from '../graphql/query/getPostsByGroup';
import { Loader } from '../components/Loader/Loader';
import { NewPost } from '../components/Post/NewPost';
import PostCard from '../components/Post/PostCard';
import { usePost } from '../context/PostContext';
import { IPost } from '../models/PostModel';
import { POST_ACTION } from '../reducers/postReducer';
import { useToast } from '../components/Toast/ToastContext';
import { Button, EButtonStyle } from '../components/StatelessInput/Button';
import IconArrow from '../components/Icons/Icon-arrow';
import theme from '../theme/theme.json';
import { EIcons } from '../components/Icons';
import { EUserPermissions } from '../models/UserModel';

const Wall = () => {
  const { data: session } = useSession();
  const [fetchPosts, { loading }] = useManualQuery(
    GET_POSTS_BY_GROUP_LIMIT_SKIP,
  );
  const myUser = session?.user;
  const { state, dispatch } = usePost();
  const { addToast } = useToast();
  const [skip, setSkip] = useState(0);
  const [hitLimit, setHitLimit] = useState(false);

  useEffect(() => {
    setSkip(0);
  }, []);

  useEffect(() => {
    setSkip(0);
    const myGroups = myUser?.orgs.map((o) => o.group.id);
    fetchPostData(myGroups || []);
  }, [myUser]);

  const fetchPostData = async (groupList: Array<string>) => {
    if (hitLimit) {
      return;
    }
    const data = await fetchPosts({
      variables: {
        ids: groupList,
        limit: 10,
        skip,
      },
    });
    console.log(data.data);
    if (data.data?.getPostsByGroup) {
      setSkip(skip + 10);
      if (data?.data.getPostsByGroup.length === 0) {
        setHitLimit(true);
      }
      dispatch({
        type: POST_ACTION.SET_POSTS,
        payload: {
          posts: data?.data.getPostsByGroup || [],
        },
      });
    }
    if (data.error) {
      addToast(
        'Error Fetching Posts',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
    }
  };

  const newPost = (post: IPost) => {
    console.log({ post });
    dispatch({
      type: POST_ACTION.ADD_POST,
      payload: {
        post,
      },
    });
  };

  function loadMorePosts() {
    const myGroups = myUser?.orgs.map((o) => o.group.id);
    fetchPostData(myGroups || []);
  }

  function scrollToTop() {
    const container = document.getElementById('scrollable-container');
    container?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  console.log({ posts: state.posts });

  return (
    <div className=" max-w-md mx-auto py-5">
      <Button
        buttonStyle={EButtonStyle.BRAND_BLUE}
        className="fixed bottom-1 right-5 h-[2.5em] w-[2.5em] flex justify-center items-center"
        onClick={scrollToTop}
        label="Scroll To Top"
      >
        <span className=" rotate-[270deg] ">
          <IconArrow height={20} width={20} />
        </span>
      </Button>
      <NewPost onCreate={newPost} />
      {state.posts.map((p: IPost) => (
        <>
          {console.log('p', p)}
          <PostCard key={p.id} {...p} />
        </>
      ))}
      {loading && (
        <div className="flex justify-center pt-1 pb-2">
          <Loader />
        </div>
      )}
      {!loading && state.posts.length === 0 && <h1>No Posts</h1>}
      {!hitLimit && !loading && (
        <div className=" flex justify-center">
          <Button buttonStyle={EButtonStyle.BRAND} onClick={loadMorePosts}>
            Load More Posts
          </Button>
        </div>
      )}
      {hitLimit && (
        <p className="text-center border-t-2 border-brand-500 pt-2">
          All Posts Loaded
        </p>
      )}
    </div>
  );
};

Wall.auth = true;
Wall.permissions = [EUserPermissions.CAN_VIEW_POST];

export default Wall;
