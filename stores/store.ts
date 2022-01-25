import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../reducers/postReducer';
import userReducer from '../reducers/userReducer';
import { IGlobalState } from './globalState';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    // comments: commentsReducer,
    // users: usersReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = IGlobalState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
