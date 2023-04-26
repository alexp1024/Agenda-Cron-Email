const unicornRules = {
  "unicorn/filename-case": [
    "error",
    {
          cases: {
              kebabCase: true,
      },
    },
  ],
  "unicorn/prevent-abbreviations": [
    "error",
    {
          ignore: [
        "e2e",
        "validate-e2e-env"
      ],
          replacements: {
              props: false,
      },
    },
  ],
  "unicorn/no-array-reduce": "off",
  "unicorn/prefer-node-protocol": "off",
  "unicorn/prefer-export-from": "off",
  "unicorn/no-await-expression-member": "off",
  "unicorn/no-null": "off",
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  root: true,
  env: {
      node: true,
      jest: true,
      es6: true,
  },
  parserOptions: { ecmaVersion: "2021"
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  rules: {
      ...unicornRules,
    "prettier/prettier": [
      "error",
      {},
      { usePrettierrc: true
      }
    ],
    "import/no-unresolved": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
              js: "never",
              jsx: "never",
              ts: "never",
              tsx: "never",
      },
    ],
  },
  settings: {
    "import/internal-regex": /^@\ //,
      "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx"
      ],
    },
    "import/resolver": {
          typescript: {
              alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
              project: "tsconfig.json",
      },
    },
  },
  overrides: [
    {
          files: [
        "**/*.ts",
        "**/*.tsx"
      ],
          plugins: [
        "@typescript-eslint/eslint-plugin"
      ],
          extends: [
        "plugin:@typescript-eslint/recommended",
        "airbnb-typescript/base",
        "plugin:prettier/recommended",
        "plugin:unicorn/recommended",
        "prettier",
      ],
          parser: "@typescript-eslint/parser",
          parserOptions: {
              project: "tsconfig.json",
              sourceType: "module",
              ecmaVersion: "2021",
      },
          rules: {
              ...unicornRules,
        "import/prefer-default-export": "off",
        "import/extensions": [
          "error",
          "ignorePackages",
          {
                      js: "never",
                      jsx: "never",
                      ts: "never",
                      tsx: "never",
          },
        ],
        "import/order": [
          "error",
          {
                      pathGroups: [
              {
                              pattern: "@nestjs/**",
                              group: "external",
              },
              {
                              pattern: "@casl/**",
                              group: "external",
              },
              {
                              pattern: "@generated",
                              group: "internal",
                              position: "after",
              },
            ],
                      groups: [
              "builtin",
              "external",
              "internal",
              [
                "parent",
                "sibling"
              ],
              "index",
              "object",
              "unknown",
            ],
          },
        ],
        "prettier/prettier": [
          "error",
          {},
          { usePrettierrc: true
          }
        ],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "max-classes-per-file": [
          "error",
          2
        ],
        "no-param-reassign": "off",
      },
    },
  ],
};
