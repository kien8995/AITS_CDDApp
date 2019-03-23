import { AUTHENTICATTION, LOADING, ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  currentUser: {
    authenticated: false,
    userId: false,
    username: false,
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    case AUTHENTICATTION:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        currentUser: {
          authenticated: action.authenticated,
          userId: action.userId,
          username: action.username,
        },
      });
    case ERROR:
      return Object.assign({}, state, { loading: false, error: action.error });
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
