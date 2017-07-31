var fs = require('fs');
var path = require('path');
function HtmlExtract(options) {
  this.htmlRoot = options.htmlRoot;//定义html的根目录
}

HtmlExtract.prototype.apply = function(compiler) {
  var me = this;
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      var options = htmlPluginData.plugin.options;
      var fileName = path.resolve(me.htmlRoot, options.filename);
      fs.readFile(fileName, 'utf8', function(err, html){
            var titleReg = /<title>.*\\?<\/title>/ig;
            var bodyReg = /<body>.*\\?<\/body>/ig;
            var htmlArr = html.match(titleReg);
            htmlPluginData.html = htmlPluginData.html.replace(titleReg, htmlArr[0]);
            htmlPluginData.html = htmlPluginData.html.replace(bodyReg, ('<body>' + html.replace(titleReg, '') + '</body>'));
            callback(null, htmlPluginData);
        });
    });
  });

};

module.exports = HtmlExtract;
