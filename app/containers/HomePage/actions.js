import { LOADING, ERROR, LOAD_FILE, IMPORT_DATA } from './constants';

export const actionLoading = () => ({
  type: LOADING,
  loading: true,
  error: null,
});

export const actionError = error => ({
  type: ERROR,
  loading: false,
  error,
});

export const loadFile = data => ({
  type: LOAD_FILE,
  loading: true,
  error: false,
  data,
});

export const importData = () => ({
  type: IMPORT_DATA,
  loading: false,
  error: false,
});
