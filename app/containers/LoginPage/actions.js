import { AUTHENTICATTION, LOADING, ERROR } from './constants';

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

export const userAuthentication = (authenticated, userId, username) => ({
  type: AUTHENTICATTION,
  loading: false,
  error: null,
  authenticated,
  userId,
  username,
});
