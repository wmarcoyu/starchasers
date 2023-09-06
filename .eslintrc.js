module.exports = {
    extends: ["airbnb", "prettier"],
    plugins: ["react", "react-hooks", "jsx-a11y", "import"],
    env: {
      browser: true,
    },
    // Allow use of console.log()
    rules: {
      "no-console": 0,
  
      // Rules for React Hooks
      // https://reactjs.org/docs/hooks-rules.html#eslint-plugin
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
      "react/prefer-stateless-function": "off",
    },
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: "latest",
          sourceType: "module",
        },
        extends: ["airbnb", "prettier"],
        plugins: ["react", "react-hooks", "jsx-a11y", "import"],
        rules: {
          "no-console": 0,
          "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
          "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
          // Allow JSX in .ts and .tsx files
          "react/jsx-filename-extension": [
            2,
            { extensions: [".js", ".jsx", ".ts", ".tsx"] },
          ],
        },
      },
    ],
};
  