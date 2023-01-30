'use strict';

const express = require('express');
const cors = require('cors');
const config = require('./config');

const PORT = config.port;
const app = express();

app.use(cors());
app.use(express.static(config.distWidgetPath));
app.set('port', PORT);

app.listen(PORT, function () {
  console.log(`Source files hosted on port ${app.get('port')}!`);
  console.log(`Source path: ${config.distWidgetPath}`);
});
