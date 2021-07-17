const merge = require('webpack-merge');
const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base');
const projectRoot = process.cwd();

const devConfig = {
  mode:'development',
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[hash:8].js',
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer:{
    contentBase:false,
    hot:true,
    port:9962,
    stats:'errors-only'
  },
  devtool:'cheap-source-map',
}

module.exports = merge(baseConfig, devConfig);