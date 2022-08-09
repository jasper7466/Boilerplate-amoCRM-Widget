const fse = require('fs-extra');
const zipper = require('zip-a-folder');
const { execSync } = require('child_process');

const config = require('./config');
const loaderCode = `define(['http://localhost:${config.port}/script.js', 'jquery', 'lib/components/base/modal'], function (widget, $, Modal) {return widget;});`;

const log = function (message, newLine = false) {
  const postfix = newLine ? '\n' : ' ';
  process.stdout.write(message + postfix);
};

const clean = function () {
  log('Cleaning up dist folder...');
  fse.emptyDirSync(config.distRootPath);
  log('Done', true);
};

const compileTypeScript = function () {
  log('Compiling TypeScript...');
  try {
    const task = execSync('npx tsc');
  } catch (error) {
    log('\n\n');
    console.error(`tsc: ${error.stdout.toString()}`);
    throw new Error('TypeScript compilation error');
  }
  log('Done', true);
};

const copyStatic = function () {
  log('Copying static files...');
  fse.copySync(config.staticPath, config.distWidgetPath, {
    overwrite: true,
    errorOnExist: true,
  });
  log('Done', true);
};

const makeLoaderScript = function () {
  log('Overwriting script.js...');
  fse.writeFileSync(`${config.distWidgetPath}/script.js`, loaderCode, {
    encoding: 'utf8',
    flag: 'w',
  });
  log('Done', true);
};

const zip = function () {
  log('Zipping...');
  (async function () {
    await zipper.zip(config.distWidgetPath, `${config.distWidgetPath}.zip`);
  })();
  log('Done', true);
};

module.exports = {
  log,
  clean,
  copyStatic,
  makeLoaderScript,
  compileTypeScript,
  zip,
};
