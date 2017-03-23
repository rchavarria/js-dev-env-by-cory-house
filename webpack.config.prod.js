import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,

  // tool to generate source maps
  devtool: 'source-map',

  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    // eliminate duplicate package when generating the bundle
    new webpack.optimize.DedupePlugin(),

    // minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
