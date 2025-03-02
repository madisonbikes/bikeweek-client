module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    browser: true,
    jest: true,
    "vitest-globals/env": true,
  },
  extends: [],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vitest-globals/recommended",
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
    "no-autofix/prefer-const": "error",
    eqeqeq: ["warn", "smart"],
    "func-style": ["warn"],
    // Note: you must disable the base rule as it can report incorrect errors
    "require-await": "off",
    "@typescript-eslint/require-await": "error",

    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],

    // not useful with use of HttpStatus error codes
    "@typescript-eslint/no-unsafe-enum-comparison": "off",

    "@typescript-eslint/no-unused-vars": [
      "warn", // or error
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
