import { useReducer, createContext } from 'react';
import { user, initialUserState } from '../reducers/userReducer';

// initial state
const initialState = {
  user: initialUserState,
};

// create context
const StateContext = createContext({});

// combine reducer function
const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(user), initialState);
  const value = { state, dispatch };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export { StateContext, StateProvider };
