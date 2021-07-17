/* eslint-disable linebreak-style */
/* eslint-disable global-require */
/* eslint-disable array-callback-return */
const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugin = []

  const entryFiles = glob.sync(path.join(projectRoot, 'src/*/index-server.js'))
  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index]
      const match = entryFile.match(/src\/(.*)\/index-server\.js/)
      const pageName = match && match[1]
      if (pageName) {
        entry[pageName] = entryFile
        htmlWebpackPlugin.push(
          new HtmlWebpackPlugin({
            template: path.join(projectRoot, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: ['vendors', 'commons', pageName],
            inject: true,
            minify: {
              html5: true,
              collapseWhitespace: true,
              preserveLineBreaks: false,
              minifyCSS: true,
              minifyJS: true,
              removeComments: false
            }
          }))
      }
    })
  return {
    entry,
    htmlWebpackPlugin
  }
}
const { entry, htmlWebpackPlugin } = setMPA()

const ssrConfig = {
  mode: 'production',
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]-server.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
  ].concat(htmlWebpackPlugin),
};

module.exports = merge(baseConfig, ssrConfig);