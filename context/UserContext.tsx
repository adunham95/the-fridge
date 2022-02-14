import React, {
  createContext,
  ReactChild,
  useContext,
  useReducer,
} from 'react';
import { IStateUser } from '../models/UserModel';
import { UserActions, userReducer } from '../reducers/userReducer';

const initialState: IStateUser = {
  name: 'Adrian Dunham',
  email: 'adunham95@gmail.com',
  username: 'adunham95@gmail.com',
};

const UserContext = createContext<{
  state: IStateUser,
  dispatch: React.Dispatch<UserActions>,
}>({
  state: initialState,
  dispatch: () => null,
});

interface IProps {
  children: ReactChild;
}

const UserProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within PostContext');
  }

  return context;
};

export { UserContext, UserProvider, useUser };
