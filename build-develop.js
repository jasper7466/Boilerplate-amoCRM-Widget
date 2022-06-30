const utils = require('./utils');

console.log('Building project (develop):');

utils.clean();
utils.copyStatic();
utils.compileTypeScript();

console.log('Finished!');
