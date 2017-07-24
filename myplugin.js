// MyPlugin.js
let htmlToText = require('html-to-text');
function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      console.log(htmlPluginData);
      console.log(require('./view/common.ejs'));
      htmlPluginData.html = '<html>\n<head>\n' +  htmlPluginData.html + '\n</head>\n<body>\n12323\n</body>\n</html>'
      callback(null, htmlPluginData);
    });
  });

};

module.exports = MyPlugin;
