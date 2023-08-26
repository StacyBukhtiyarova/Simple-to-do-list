module.exports = {
  env: { browser: true },
  extends: 'eslint-config-airbnb-base',
  globals: {
    document: true,
    alert: true,
  },
  rules: {
    'no-console': 1,
    eqeqeq: 2,
  },
};
