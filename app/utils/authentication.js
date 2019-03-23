import jwtDecode from 'jwt-decode';
import apiConfig from '../config/api.config';

const getJwtToken = () => localStorage.getItem(apiConfig.jwtKey);

const isExpiredToken = jwtToken => {
  const authToken = jwtDecode(jwtToken);
  if (authToken.exp < Math.floor(Date.now() / 1000)) {
    return true;
  }
  return false;
};

export const getUserSub = () => {
  const authToken = getJwtToken();
  try {
    const deToken = jwtDecode(authToken);
    if (deToken && typeof deToken === 'object' && deToken.sub) {
      return deToken.sub;
    }
  } catch (e) {
    return null;
  }
  return null;
};

export const getUserId = () => {
  const authToken = getJwtToken();
  try {
    const deToken = jwtDecode(authToken);
    if (deToken && typeof deToken === 'object' && deToken.userId) {
      return deToken.userId;
    }
  } catch (e) {
    return null;
  }
  return null;
};

export const isAuthenticated = () => {
  const authToken = getJwtToken();
  if (authToken && !isExpiredToken(authToken)) {
    return true;
  }
  return false;
};
