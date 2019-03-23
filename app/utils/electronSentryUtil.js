import { init, captureException } from '@sentry/electron';
import isDev from 'electron-is-dev';

const sentryInit = () => {
  if (!isDev) {
    init({
      dsn: '',
      sendTimeout: 0,
    });
  }
};

export default {
  sentryInit,
  captureException,
};
