module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  "ignorePatterns": ["dist/*"],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'no-new': 'off',
    semi: ['error', 'never']
  }
}
