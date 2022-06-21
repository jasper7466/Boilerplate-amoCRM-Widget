const express = require('express');
const path = require('path');
const config = require('./config');

const PORT = config.port;
const app = express();

app.use(express.static('./'));
app.set('port', PORT);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/', 'script.js'));
});

app.listen(PORT, function () {
  console.log(`Source files hosted on port ${app.get('port')}!`);
});
