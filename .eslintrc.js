module.exports = {
  "extends": [
      "airbnb",
      "plugin:flowtype/recommended",
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:jest/recommended",
      "plugin:react/recommended",
      "plugin:react-native/all",
      "prettier",
      "prettier/flowtype",
      "prettier/react"
  ],
  "parser": "babel-eslint", // Allows the usage for the latest ES features
  "env": {
      "es6": true,
      "jest": true, // Lets eslint know that jest is used
      "react-native/react-native": true,
  },
  "rules": {
      "camelcase": 0,
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "semi": 2, // force semicolon
      "import/no-named-as-default": 0,
      "import/no-extraneous-dependencies": [
          "error", {"devDependencies": false, "optionalDependencies": false, "peerDependencies": false}
      ],
      "react/jsx-filename-extension": 0,
      "no-use-before-define": 0,
      "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
      "react-native/no-unused-styles": 2,
      "react-native/no-inline-styles": 2,
      "react-native/split-platform-components": 2,
      "react-native/no-color-literals": 2,
      "import/prefer-default-export": "off",
      "no-underscore-dangle": "off",
      "react/jsx-one-expression-per-line": 0,
      "strict": "error",
      "complexity": ["error", 8],
      "max-nested-callbacks": ["error", 3],
      "react-native/no-raw-text": 0,
      "max-params": ["error", 4],
      "max-depth": ["error", 3],
      "max-len": [
          "error",
          {
          "code": 150,
          "ignoreStrings": true,
          "ignoreComments": true,
          "ignoreTemplateLiterals": true,
          "tabWidth": 2
          }
      ],
      "require-await": "error",
      "no-func-assign": "error",
      "object-shorthand": [
          "error",
          "methods",
          { "avoidExplicitReturnArrows": false }
      ],
      "object-curly-spacing": ["error", "always"],
      "prefer-const": ["error", {
          "destructuring": "any",
          "ignoreReadBeforeAssign": false
      }],
      "no-useless-return": "error",
      "no-else-return": "error",
      "no-return-await": "error",
      "no-var": "error",
      "import/no-duplicates": "error",
      "import/extensions": [
          "error",
          "never",
          {
          ".json": "always",
          }
      ],
      "jest/no-disabled-tests": "error",
      "react/require-optimization": "error",
      "react/no-unused-prop-types": "error",
      "react/no-unused-state": "error",
      "react/no-deprecated": "warn",
      "prettier/prettier": ["error", {
          "trailingComma": "es5",
          "parser": "flow",
          "printWidth": 80,
          "singleQuote": true,
      }]
  },
  "plugins": [
      "flowtype",
      "react",
      "react-native",
      "jest",
      "prettier"
  ]
};