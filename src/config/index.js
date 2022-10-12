export const VERSION_NUMBER = "1.0"
export const VERSION = 'Versión' + " " + VERSION_NUMBER;

const ENV = {
  prod: {
    TOKEN_AUTH: "https://dev.obtenmas.com",
    URL_API: "https://dev.obtenmas.com",
  }
};

export default (env = 'prod') => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.

  if (env === 'prod') {
    return ENV.prod;
  } else if (env === 'dev') {
    // if (__DEV__) {
    return ENV.dev;
  } else if (env === 'qa') {
    // if (__DEV__) {
    return ENV.qa;
  }

};
