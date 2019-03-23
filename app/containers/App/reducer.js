/*
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 */

import { combineReducers } from 'utils';
import loginReducer, {
  initialState as initialLoginState,
} from 'containers/LoginPage/reducer';

export const initialState = {
  login: initialLoginState,
};

const globalReducer = combineReducers({
  login: loginReducer,
});

export default globalReducer;
