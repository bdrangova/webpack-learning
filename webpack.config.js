var webpack = require('webpack');
var path = require('path');
var glob = require('glob-all');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var PurgeCSSPlugin = require('purgecss-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var BuildManifestPlugin = require('./build/plugins/BuildManifestPlugin');
var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: ['./src/main.js', './src/main.scss'],
    vendor: 'jquery',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  // devtool: '', //do not use eval in output
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|eot|ttf|woof|woof2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 60,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.6, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new BuildManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // @ts-ignore
    new PurgeCSSPlugin({
      paths: glob.sync(path.join(__dirname, '*.html')),
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: inProduction,
  },
};

/*
CSS loader without urls
{
  loader: 'css-loader',
  options: {
    url: false,
  },
},
*/
