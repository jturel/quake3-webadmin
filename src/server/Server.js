const WebSocketServer = require('./WebSocketServer');
const { app, closeDbConnection } = require('./App');

const port = process.env.Q3WEBADMIN_API_PORT || 3001;

const server = app.listen(port, () => {
  console.log("API started");
});

const wss = WebSocketServer(server);

const stopServer = () => {
  return new Promise((resolve, reject) => {
    wss.close(() => {
      console.log(`Closing ${wss.clients.size} websocket clients`);

      server.close(() => {
        resolve(closeDbConnection());
      });
    });
  });
};

process.on('SIGINT', () => {
  stopServer().then(() => {
    process.exit(0);
  });
});

module.exports = {
  server,
  stopServer,
};
