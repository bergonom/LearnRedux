var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    client: {
      mocha: {
        timeout: '5000'
      }
    },
    files: [
      'app/tests/**/*.test.jsx',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/foundation-sites/dist/js/foundation.min.js'
    ],
    frameworks: ['mocha'],
    preprocessors: {
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    singleRun: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  })
}
