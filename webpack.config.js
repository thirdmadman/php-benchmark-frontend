const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : false,
  target: isDev ? 'web' : 'browserslist',
  stats: {
    children: true,
  },
  entry: {
    app: ['./src/index.tsx'],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  optimization: {
    minimize: !isDev,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/static/'),
          to: path.resolve(__dirname, 'dist/static/'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'src/.htaccess'),
          to: path.resolve(__dirname, 'dist/'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      exclude: ['**/node_modules/**', `/bower_components/`],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css',
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: !isDev,
      },
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [require('autoprefixer')];
                },
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['ts-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    open: true,
    port: 8000,
    hot: true,
    static: {
      directory: path.join(__dirname, './dist'),
      watch: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
