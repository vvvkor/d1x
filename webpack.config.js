const path = require('path');
const webpack = require('webpack');

var pkg = require('./package.json');
var banner = pkg.name + ' v' + pkg.version;

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'd1.js'
  },
  optimization: {
        //minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}