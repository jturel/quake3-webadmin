const { WebsocketServer } = require('./WinstonWebsocketTransport');

module.exports = async (expressServer) => {
  const server = WebsocketServer;

  expressServer.on('upgrade', (request, socket, head) => {
    server.handleUpgrade(request, socket, head, (websocket) => {
   //   server.emit('connection', websocket, request);
    });
  });

  server.on('disconnect', (connection) => {
    console.log("closed WS connection");
  });

  return server;
};
