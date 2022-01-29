import { useReducer, createContext, ReactChild, useContext } from 'react';
import { IUser } from '../models/UserModel';
import {
  userReducer,
  initialUserState,
  UserActions,
} from '../reducers/userReducer';

// initial state
const initialState = {
  user: initialUserState,
};

interface IState {
  user: IUser;
}

// create context
const UserContext = createContext<{
  state: IState,
  dispatch: React.Dispatch<UserActions>,
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state: IState, action: UserActions) => ({
  user: userReducer(state.user, action),
});

interface IProps {
  children: ReactChild;
}

// context provider
const UserProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useOrg must be used within OrgContext');
  }

  return context;
};

export { UserContext, UserProvider, useUser };
