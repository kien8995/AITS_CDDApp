import { LOADING, ERROR } from './constants';

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
