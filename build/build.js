process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.config')

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    const spinnerCopy = ora('Copy to workdir');
    spinnerCopy.start();
    fs.copy('./dist', config.projectDir, err => {
      spinnerCopy.stop();
      if (err) return console.error(err)
      console.log(chalk.yellow('  Copy complete.\n'));
    });
  })
})
