// this file won't be transpiled, so use CommonJS and ES5
//
// register babel to transpile before our tests run
require('babel-register')();

// disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function () {};

