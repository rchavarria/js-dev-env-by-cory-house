/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

// other tools (babel) look for this env variable
process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) { // fatal error happened
    console.log(chalk.red(err));
    return 1;
  }

  // show some stats
  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(e => console.log(chalk.red(e)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generate some warnings'))
    jsonStats.warnings.map(e => console.log(chalk.yellow(e)));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log(chalk.green('App built for production and written to /dist'));

  return 0;
});
