const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const config = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /.(jpg|png)$/,
          type: 'asset/resource',
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fileName: '[name].[ext]',
              outputPath: 'images',
            },
          },
        },
        {
          test: /.js$/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      port: 9000,
      hot: true,
    },
  };
  if (isProduction) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    );
  }
  return config;
};
