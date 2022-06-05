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
    const server = await serverManager.createServer(req.body);
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

  router.delete('/servers/:uuid', async (req, res) => {
    await serverManager.deleteServer(req.params.uuid);
    res.json({ message: `Deleted server ${req.params.uuid}` });
  });

  router.post('/servers/:uuid/launch', async (req, res) => {
    await serverManager.launchServer(req.params.uuid);
    res.json({ message: `Launched server ${req.params.uuid}` });
  });

  router.post('/servers/:uuid/stop', async (req, res) => {
    await serverManager.stopServer(req.params.uuid);
    res.json({ message: `Stopped server ${req.params.uuid}` });
  });

  return router;
};

app.use(express.json());
app.use(cors());
app.use('/api/v1', v1Controller());

module.exports = app.listen(port, () => {
  console.log("API started");
});
