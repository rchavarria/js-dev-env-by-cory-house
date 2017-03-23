import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,

  // tool to generate source maps
  devtool: 'inline-source-map',

  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    // use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're catched separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
