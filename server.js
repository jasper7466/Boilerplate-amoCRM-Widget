const express = require('express');
const path = require('path');
const config = require('./config');

const PORT = config.port;
const app = express();

app.use(express.static('./src'));
app.set('port', PORT);

app.listen(PORT, function () {
  console.log(`Source files hosted on port ${app.get('port')}!`);
});
