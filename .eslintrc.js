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
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended-type-checked",
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
    "import/no-default-export": "warn",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",

    // not useful with use of HttpStatus error codes
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
  },
};
