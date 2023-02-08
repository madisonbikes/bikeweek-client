module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    browser: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  reportUnusedDisableDirectives: true,
  rules: {
    eqeqeq: ["warn", "smart"],
    "func-style": ["warn"],
    "require-await": ["error"],
    "@typescript-eslint/no-floating-promises": "error",
  },
};
