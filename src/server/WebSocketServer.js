const { WebsocketServer } = require('./WinstonWebsocketTransport');

module.exports = (expressServer) => {
  const server = WebsocketServer;

  expressServer.on('upgrade', (request, socket, head) => {
    server.handleUpgrade(request, socket, head, (websocket) => {
   //   server.emit('connection', websocket, request);
    });
  });

  return server;
};
