const path = require('path');
const webpack = require('webpack');
const userConfig = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const isProduction = process.env.NODE_ENV === 'production';
let publicDir = '/';
if (isProduction) {
  publicDir = userConfig.cdn.upload ? (userConfig.cdn.options.domain + userConfig.cdn.options.directory) : '';
}

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: './dist',
  },
  devtool: isProduction ? false : 'source-map',
  entry: userConfig.entry,
  output: {
    filename: isProduction ? '[name].[contenthash].min.js' : '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicDir,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              limit: 8192,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      // {
      //   test: /\.svg$/,
      //   use: [{
      //     loader: 'svg-url-loader',
      //     options: {
      //       limit: 8192,
      //       noquotes: true,
      //       name: '[name].[ext]',
      //       outputPath: 'assets/',
      //     },
      //   }],
      // },
      {
        test: /\.svg$/,
        use: 'raw-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: ['file-loader']
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'video:src', 'img:data-src'],
            interpolate: true,
            minimize: isProduction,
            removeComments: isProduction,
          },
        }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css',
    }),
    new CopyWebpackPlugin([
      { from: './src/static/', to: '' }
    ]),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: !isProduction,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};

if (userConfig.html.length !== 0) {
  webpackConfig.plugins = webpackConfig.plugins
    .concat(userConfig.html.map(htmlConfig => new HtmlWebpackPlugin(htmlConfig)))
    .concat([new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'async' })]);

  if (isProduction) {
    webpackConfig.plugins = webpackConfig.plugins
      .concat(userConfig.html.map(htmlConfig => new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, 'dist'),
        src: htmlConfig.filename,
        dest: htmlConfig.filename,
        inline: true,
        minify: true,
        extract: true,
        width: 375,
        height: 565,
        penthouse: {
          blockJSRequests: false,
        },
      })));
  }
}

if (userConfig.jquery) {
  webpackConfig.plugins.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }));
}

if (isProduction && userConfig.cdn.upload) {
  webpackConfig.plugins.push(new S3Plugin({
    include: /.*\.(css|js|png|jpe?g|gif|svg|mp4)$/,
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'ap-southeast-1',
    },
    s3UploadOptions: {
      Bucket: userConfig.cdn.options.bucket,
    },
    basePath: userConfig.cdn.options.directory,
  }));
}

module.exports = webpackConfig;
