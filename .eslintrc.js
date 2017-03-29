module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.js files
  plugins: [
    'react',
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .js extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never'
    }],
    "no-unused-vars": ["off"],
    "class-methods-use-this": ["off"],
    "semi": ["error", "always", { "omitLastInOneLineBlock": true}],
    "no-unused-expressions": ["off"],
    "arrow-body-style": ["error", "always"],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
