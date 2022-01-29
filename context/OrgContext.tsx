import { useReducer, createContext, ReactChild, useContext } from 'react';
import { IOrg } from '../models/OrgModel';
import { orgReducer, OrgActions } from '../reducers/orgReducer';

// initial state
const initialState = {
  orgs: [],
};

interface IState {
  orgs: Array<IOrg>;
}

// create context
const OrgContext = createContext<{
  state: IState,
  dispatch: React.Dispatch<OrgActions>,
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state: IState, action: OrgActions) => ({
  orgs: orgReducer(state.orgs, action),
});

interface IProps {
  children: ReactChild;
}

// context provider
const OrgProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <OrgContext.Provider value={{ state, dispatch }}>
      {children}
    </OrgContext.Provider>
  );
};

const useOrg = () => {
  const context = useContext(OrgContext)

  if (context === undefined) {
    throw new Error("useOrg must be used within OrgContext")
  }

  return context
}

export default useOrg



export { OrgContext, OrgProvider };
