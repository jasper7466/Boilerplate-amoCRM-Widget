const fse = require('fs-extra');
const zipper = require('zip-a-folder');
const config = require('./config');

const port = config.port;
const content = `define(["http://localhost:${port}/"], function (widget) {return widget;});`;

console.log('Building script loader project:');

console.log('Cleaning up dist folder...');
fse.removeSync('./dist');

console.log('Copying source files...');
fse.copySync('./src', './dist/widget', {
  overwrite: false,
  errorOnExist: true,
});

console.log('Overwriting script.js...');
fse.writeFileSync('./dist/widget/script.js', content, {
  encoding: 'utf8',
  flag: 'w',
});

console.log('Zipping...');
(async function () {
  await zipper.zip('./dist/widget', './dist/widget.zip');
})();

console.log('Finished!');
