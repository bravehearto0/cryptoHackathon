require('babel-register')({
  presets: ['es2015', 'stage-0', 'flow'],
  ignore: /node_modules(?!\/(haul|react-native))/,
  retainLines: true,
  sourceMaps: 'inline',
});
require('babel-polyfill');

if (process.argv.indexOf('--webpack-config') >= 0 ||
  process.argv[1].indexOf('eslint') >= 0) {
  module.exports = require('./webpack.config');
} else {
  require('./webpack.run');
}
