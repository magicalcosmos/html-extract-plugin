let path = require('path');
let HtmlExtract = require('../index');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry : [
    './index.js'
  ],
  output : {
      path : path.resolve('./build'),
      filename :  '[name].js?[hash:8]',
      chunkFilename :  '[chunkhash:8].chunk.js',
      hotUpdateChunkFilename : '[id].js',
      publicPath : '/'
  },
  module : {
      rules: [
          {
              test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
              use : [{
                  // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                  // 否则则调用file-loader，参数直接传入
                  loader : 'url-loader',
                  options : {
                      limit : 1000,
                      name : 'img/[hash:8].[name].[ext]'
                  }
              },{
                  loader : 'image-webpack-loader',
                  options : {
                      bypassOnDebug : false,
                      progressive   : true,
                      gifsicle : false,
                      optipng: {
                          optimizationLevel : 4
                      },
                      pngquant : {
                          quality : '65-80',
                          speed   : 3
                      }
                  }
              }

              ]
          },
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use : [
                  {loader : 'babel-loader'}
              ]
          },
          {test: /\.(tpl|ejs|html)$/,loader: 'ejs-compiled-loader?htmlmin'},
          {
              test: /\.css$/,
              exclude: /node_modules/,
              use : ['css-loader?modules']
          },
          {
              test: /\.scss$/,
              exclude: /node_modules/,
              use : ['css-loader', 'sass-loader']
          },
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader?presets[]=react,presets[]=es2015',// Do not use "use" here
          }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template : './template.html'
    }),
    new HtmlExtract()
  ]
};
