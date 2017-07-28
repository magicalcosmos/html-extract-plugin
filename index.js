var htmlToText = require('html-to-text');
var fs = require('fs');

function HtmlExtract(options) {}

HtmlExtract.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      var options = htmlPluginData.plugin.options;
      fs.readFile(options.filename, 'utf8', function(err, html){
          var titleReg = /<title>.*?<\/title>/ig;
          var bodyReg = /<body>.*?<\/body>/ig;
          var htmlArr = html.match(titleReg);
          htmlPluginData.html = htmlPluginData.html.replace(titleReg, htmlArr[0]);
          htmlPluginData.html = htmlPluginData.html.replace(bodyReg, '<body>' + html.replace(titleReg, '') + '</body>');
          callback(null, htmlPluginData);
      });
    });
  });

};

module.exports = HtmlExtract;
