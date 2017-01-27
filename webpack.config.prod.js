const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entries = [];
entries.push('./src/scripts/bootstrap.js');

const extractTextInstance = new ExtractTextPlugin({
  filename: 'bundle-[contenthash].css',
  disable: false,
  allChunks: true,
});

module.exports = {
  entry: {
    bundle: entries,
  },
  output: {
    path: path.resolve(__dirname, '.'),
    publicPath: '/',
    filename: 'bundle-[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/favicon.ico',
      hash: true,
      template: './src/index.html',
    }),
    extractTextInstance,
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
        loader: extractTextInstance.extract({
          fallbackLoader: "style-loader",
          loader: [
            {
              loader: 'css-loader',
              query: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ]
        }),
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
