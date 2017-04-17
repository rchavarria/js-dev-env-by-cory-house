/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 3000;
const app = express();

app.use(compression()); // enable gzip compression to serve files
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', (req, res) => {
  // hard codign for simplicity
  res.json([
    { id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bob@gmail.com' },
    { id: 2, firstName: 'Tammy', lastName: 'Norton', email: 'tnorton@gmail.com' },
    { id: 3, firstName: 'Tina', lastName: 'Lee', email: 'tina.lee@gmail.com' }
  ]);
});

app.listen(port, err => {
  if (err) {
    console.log('Error!', err);
  } else {
    open('http://localhost:' + port);
  }
});
