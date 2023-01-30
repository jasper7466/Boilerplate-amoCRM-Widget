const utils = require('./utils');

console.log('Building script loader:');

utils.clean();
utils.copyStatic();
utils.compileTypeScript();
utils.appendImportsExtensions();
utils.makeLoaderScript();
utils.zip();

console.log('Finished!');
