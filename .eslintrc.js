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
    "plugin:react-hooks/recommended",
    "react-app",
    "react-app/jest",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
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
  plugins: ["react", "@typescript-eslint", "no-autofix"],
  settings: {
    react: {
      version: "detect",
    },
  },
  reportUnusedDisableDirectives: true,
  rules: {
    "prefer-const": "off",
    "no-autofix/prefer-const": "error",
    eqeqeq: ["warn", "smart"],
    "func-style": ["warn"],
    "require-await": ["error"],
    "@typescript-eslint/no-floating-promises": "error",
    "import/no-default-export": 2,
  },
};
