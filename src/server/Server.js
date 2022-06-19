const express = require('express');
const PouchDB = require('pouchdb');
const cors = require('cors');
const nocache = require('nocache');

const port = process.env.Q3WEBADMIN_API_PORT || 3001;
const db = process.env.Q3WEBADMIN_API_DB || '/home/jturel/.config/quake3-webadmin/pouchdb';
const configPath = '/home/jturel/.q3a/baseq3';
const dbConnection = new PouchDB(db);
const Logger = require('./Logger')
const ApiServerPresenter = require('./ApiServerPresenter');

const logger = Logger();

dbConnection.info().then((info) => {
  logger.info(`Opened database connection to ${info.db_name}`);
});

const ServerManager = require('./ServerManager');
const executable = '/home/jturel/code/ioq3-main/build/release-linux-x86_64/ioq3ded.x86_64';
const serverManager = new ServerManager({ db: dbConnection, configPath, executable });

const ServerMonitor = require('./ServerMonitor');
const serverMonitor = new ServerMonitor({ serverManager });
serverMonitor.start();

const WebSocketServer = require('./WebSocketServer');

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

const server = app.listen(port, () => {
  logger.info("API started");
});

WebSocketServer(server);

module.exports = server;
