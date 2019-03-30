import { LOADING, ERROR, LOAD_FILE, IMPORT_DATA } from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: [],
};

const cddReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    case ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case LOAD_FILE:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        data: action.data,
      });
    case IMPORT_DATA:
      return Object.assign({}, state, {
        loading: false,
        error: false,
      });
    default:
      return state;
  }
};

export default cddReducer;
