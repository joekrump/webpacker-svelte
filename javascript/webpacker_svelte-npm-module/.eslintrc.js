module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    semi: ['error', 'never']
  },
  env: {
    browser: true,
    node: true
  }
}
