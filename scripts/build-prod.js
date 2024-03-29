const utils = require('./utils');

console.log('Building project (production):');

utils.clean();
utils.copyStatic();
utils.compileTypeScript();
utils.appendImportsExtensions();
utils.removeConsoleLogs();
utils.zip();

console.log('Finished!');
