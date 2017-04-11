import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMD5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
    filename: '[name].[chunkhash].js'  // use a placeholder because there are more than one *entry*, and add an MD5 hash
  },
  plugins: [
    // Generate an external CSS file with a hash in the filename
    new ExtractTextPlugin('[name].[chunkhash].css'),

    // Hash bundle files with MD5 so that their names change ONLY when content changes
    new WebpackMD5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // create an html that references to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',   // we'll use a template for this plugin
      inject: true,                 // webpakc will write <script> tags for us
      // any property declared here are available on index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: 'foobar'
    }),

    // eliminate duplicate package when generating the bundle
    new webpack.optimize.DedupePlugin(),

    // minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }
}
