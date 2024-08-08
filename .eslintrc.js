/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: [
    //
    '@typescript-eslint',
    '@stylistic',
  ],
  ignorePatterns: ['.eslintrc.js', 'build.js'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
}
