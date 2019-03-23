import { combineReducers } from 'utils';
import globalReducer, {
  initialState as initialGlobalState,
} from 'containers/App/reducer';
import languageProviderReducer, {
  initialState as initialLanguageProviderState,
} from 'containers/LanguageProvider/reducer';

export const initialState = {
  global: initialGlobalState,
  language: initialLanguageProviderState,
};

const rootReducer = combineReducers({
  global: globalReducer,
  language: languageProviderReducer,
});

export default rootReducer;
