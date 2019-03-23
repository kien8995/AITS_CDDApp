/*
 *
 * LanguageProvider reducer
 *
 */

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

const languageProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return Object.assign({}, state, { locale: action.locale });
    default:
      return state;
  }
};

export default languageProviderReducer;
