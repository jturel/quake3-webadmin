const Transport = require('winston-transport');

const ws = require('ws');
const WebsocketServer = new ws.Server({ noServer: true, path: '/ws' });

class WebsocketTransport extends Transport {
  log(info, callback) {

    WebsocketServer.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(info));
      }
    });

    callback();
  };
};

module.exports = {
  WebsocketTransport,
  WebsocketServer,
};
