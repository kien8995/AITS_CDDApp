import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import rootReducer, { initialState as rootInitialState } from './reducer';

const StoreContext = createContext(rootInitialState);

export const useStore = () => {
  const store = useContext(StoreContext);
  const { state, dispatch } = store;

  return { state, dispatch };
};

const Store = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    // fetch data or dispatch action here
  }, []);

  const contextValue = {
    state,
    dispatch,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

Store.propTypes = {
  initialState: PropTypes.object,
  children: PropTypes.element,
};

Store.defaultProps = {
  initialState: rootInitialState,
};

export default Store;
