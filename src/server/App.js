const express = require('express');
const PouchDB = require('pouchdb');
const cors = require('cors');
const nocache = require('nocache');

const ApiServerPresenter = require('./ApiServerPresenter');
const Config = require('./Config')();
const ServerManager = require('./ServerManager');

console.log('Config loaded');
console.log(Config);

const dbConnection = new PouchDB(Config.dbPath);
dbConnection.info().then((info) => {
  console.log(`Opened database connection to ${info.db_name}`);
});

const closeDbConnection = () => {
  return dbConnection.close(() => {
    console.log("Closed DB connection");
  });
};

const serverManager = new ServerManager({
  db: dbConnection,
  configPath: Config.baseQ3Path,
  executable: Config.q3Executable,
});

const app = express();

const v1Controller = () => {
  const router = express.Router();

  router.get('/servers', async (req, res) => {
    const servers = await serverManager.allServers();
    const presented = servers.map(ApiServerPresenter);
    res.json({ result: presented });
  });

  router.post('/servers', async (req, res) => {
    const server = await serverManager.createServer(req.body);
    res.json({ result: server });
  });

  router.get('/servers/:uuid', async (req, res) => {
    const server = await serverManager.findServer(req.params.uuid);
    res.json({ result: ApiServerPresenter(server) });
  });

  router.put('/servers/:uuid', async (req, res) => {
    const server = await serverManager.updateServer(req.body);
    res.json({ result: server });
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
app.use(nocache());
app.use('/api/v1', v1Controller());

module.exports = {
  app,
  closeDbConnection,
};
