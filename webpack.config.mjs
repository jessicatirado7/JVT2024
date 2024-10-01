import path from 'path';
import * as glob from 'glob';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'production',
  entry: './src/all.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          unused: true,
          dead_code: true,
        },
      },
    })],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(process.cwd(), 'src')}/**/*`, { nodir: true }),
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'index.html'), // Use absolute path for index.html
    }),
    
    // Dynamically import the 'critical' package and execute it in a separate process
    function () {
      this.hooks.afterEmit.tapPromise('CriticalCssPlugin', async () => {
        const { generate } = await import('critical');
        await generate({
          base: path.resolve(process.cwd(), 'dist/'),
          src: 'index.html',
          inline: true,
          extract: true,
          width: 1300,
          height: 900,
        });
      });
    },
  ],
};
