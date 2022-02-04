import { useReducer, createContext, ReactChild, useContext } from 'react';
import { IPost } from '../models/PostModel';
import { PostActions, postReducer } from '../reducers/postReducer';

// initial state
const initialState = {
  posts: [],
};

interface IState {
  posts: Array<IPost>;
}

// create context
const PostContext = createContext<{
  state: IState,
  dispatch: React.Dispatch<PostActions>,
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state: IState, action: PostActions) => ({
  posts: postReducer(state.posts, action),
});

interface IProps {
  children: ReactChild;
}

// context provider
const PostProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error('useOrg must be used within OrgContext');
  }

  return context;
};

export { PostContext, PostProvider, usePost };
