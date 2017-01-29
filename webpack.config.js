const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = [];
entries.push('./src/scripts/bootstrap.js');

module.exports = {
  entry: {
    bundle: entries,
  },
  output: {
    path: path.resolve(__dirname, '.'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/favicon.ico',
      hash: false,
      template: './src/index.html',
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '.'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.(gif|jpg|png|woff|woff2)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },

  stats: {
    colors: true,
  },

  devtool: 'source-map',
};
