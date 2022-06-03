const express = require('express');
const PouchDB = require('pouchdb');

const db = new PouchDB('/home/jturel/.config/quake3-webadmin/pouchdb');

db.info().then((info) => {
  console.log("Opened database connection to " + info.db_name);
});

const app = express();

app.post('/api/v1/servers', (req, res) => {
  res.json({ message: 'server created' });
});

app.listen(3001, () => {
  console.log("API started");
});
