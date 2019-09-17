const express = require('express');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.listen(port, () => {
  debug('listening at, ', port);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/script', express.static(path.join(__dirname, '/')));
