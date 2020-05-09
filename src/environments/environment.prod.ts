export const environment = {
  production: true,
  routes: {
    home: '/home/screens',
    login: '/auth/login'
  },
  version: '3.0.0',
  server: {
    host: 'localhost',
    port: 5000,
    routes: {
      api: 'api',
      files: 'files'
    },
    maxFileSize: 2 * 1024 * 1024
  }
};
