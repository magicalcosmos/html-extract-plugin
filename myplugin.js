// MyPlugin.js
let htmlToText = require('html-to-text');
let fs = require('fs');
function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      let options = htmlPluginData.plugin.options;
      fs.readFile(options.filename, 'utf8', function(err, html){
          let titleReg = /<title>.*?<\/title>/ig;
          let bodyReg = /<body>.*?<\/body>/ig;
          let htmlArr = html.match(titleReg);
          htmlPluginData.html = htmlPluginData.html.replace(titleReg, htmlArr[0]);
          htmlPluginData.html = htmlPluginData.html.replace(bodyReg, '<body>' + html.replace(titleReg, '') + '</body>');
          callback(null, htmlPluginData);
      });
    });
  });

};

module.exports = MyPlugin;
