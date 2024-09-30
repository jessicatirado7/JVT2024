const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/all.js', // Your entry point file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/, // To handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // To handle image files
        type: 'asset/resource',
      },
    ],
  },
};
