#Instruction
This is a plugin of webpack which extracting common html, we have two things need to do, first, we should create template for common html, second, no-common html is as webpack entry html.
##How to use it
1. `npm install html-extract-plugin --save-dev`

2. Webpack Config

``````
let path = require('path');
let HtmlExtract = require('html-extract-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template : './template.html'
    }),
    new HtmlExtract()
  ]
};

``````
please see the example, run `webpack` in command line

