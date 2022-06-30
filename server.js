const express = require('express');
const path = require('path');
const config = require('./config');

const PORT = config.port;
const app = express();

app.use(express.static(config.distWidgetPath));
app.set('port', PORT);

app.listen(PORT, function () {
  console.log(`Source files hosted on port ${app.get('port')}!`);
  console.log(`Source path: ${config.distWidgetPath}`);
});
