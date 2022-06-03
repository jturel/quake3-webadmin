const express = require('express');
const PouchDB = require('pouchdb');
const cors = require('cors');

const port = process.env.Q3WEBADMIN_API_PORT || 3001;
const db = process.env.Q3WEBADMIN_API_DB || '/home/jturel/.config/quake3-webadmin/pouchdb';
const dbConnection = new PouchDB(db);

dbConnection.info().then((info) => {
  console.log("Opened database connection to " + info.db_name);
});

const ServerManager = require('./ServerManager');
const serverManager = new ServerManager(dbConnection);

const app = express();

const v1Controller = () => {
  const router = express.Router();

  router.get('/servers', async (req, res) => {
    const servers = await serverManager.allServers();
    res.json({ result: servers });
  });

  router.post('/servers', async (req, res) => {
    const server = await serverManager.createServer(req.params.server);
    res.json({ result: server });
  });

  router.get('/servers/:uuid', async (req, res) => {
    const server = await serverManager.findServer(req.params.uuid);

    if (server) {
      res.json({ result: server });
    } else {
      res.json({ message: 'does not exist' });
    }
  });

  return router;
};

app.use(cors());
app.use('/api/v1', v1Controller());

module.exports = app.listen(port, () => {
  console.log("API started");
});
