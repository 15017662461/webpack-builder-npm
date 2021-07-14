/* eslint-disable linebreak-style */
const {merge} = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8533,
  },
  devtool: 'source-map',
};
module.exports = merge(baseConfig, devConfig);
