const path = require("path");
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    main: "./starchasers/static/js/index/main.jsx",
    details: "./starchasers/static/js/details/details.jsx",
    search: "./starchasers/static/js/search/search.jsx"
  },
  output: {
    path: path.join(__dirname, "/starchasers/static/js/build/"),
    filename: "[name].bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        // Exclude external modules from loader tests
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/transform-runtime"],
        },
      },
      {
        // Support for TypeScript in optional .ts or .tsx files
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // DatePicker CSS files.
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
