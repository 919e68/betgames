const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve('public/js'),
    filename: 'app.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [ "es2015", "react" ]
      }
    }]
  }
}
