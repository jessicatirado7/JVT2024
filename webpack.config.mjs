import path from 'path';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as glob from 'glob';
import BrotliPlugin from 'brotli-webpack-plugin';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const require = createRequire(import.meta.url);

// Check if we're in production or development mode
const isProd = process.env.NODE_ENV === 'production';

// Resolve the __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: isProd ? 'production' : 'development',
  target: 'web', // Make sure this is set to 'web' for browser builds
  entry: './src/app.js',
  output: {
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    clean: true,
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // 🔁 Replaced file-loader + image-webpack-loader with asset modules
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // Convert images < 4kb to base64
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      fs: false,
      path: false,
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      url: require.resolve('url/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      net: require.resolve('net-browserify'),
      util: require.resolve('util/'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 3,
            reduce_funcs: true,
            reduce_vars: true,
            sequences: true,
            conditionals: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 300000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          minChunks: 1,
          reuseExistingChunk: true,
          maxSize: 150000,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          maxSize: 150000,
        },
      },
    },
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(process.cwd(), 'src')}/**/*`, { nodir: true }),
      safelist: ['owl-carousel', 'popup', 'carousel'],
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: {
        level: 9,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'index.html'),
      inject: 'body',
      scriptLoading: 'defer',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: 'bundle-report.html',
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new NodePolyfillPlugin(),
  ],
};