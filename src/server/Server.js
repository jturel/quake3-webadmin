const WebSocketServer = require('./WebSocketServer');
const { app, closeDbConnection } = require('./App');

const port = process.env.Q3WEBADMIN_API_PORT || 3001;

const server = app.listen(port, () => {
  console.log("API started");
});

server.on('close', () => {
  return closeDbConnection();
});

WebSocketServer(server);

module.exports = server;
