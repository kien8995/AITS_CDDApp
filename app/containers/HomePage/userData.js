import LocalStore from '../../utils/LocalStore';

export const userData = new LocalStore({
  configName: 'cdd-user-preferences',
  defaults: {
    database: {
      user: 'sa',
      password: 'k6sa',
      server: '10.125.0.6',
      database: 'CDDData',
    },
    cddData: {
      directory: 'E:\\Delivery Data',
    },
  },
});
