module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    document: true,
    test: true,
    expect: true,
    describe: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
};
