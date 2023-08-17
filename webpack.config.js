const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/index.scss'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /.(jpg|png)$/,
        type: 'asset/resource',
        use: {
          loader: 'image-webpack-loader',
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
};
