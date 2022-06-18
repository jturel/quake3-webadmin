const Transport = require('winston-transport');

const ws = require('ws');
const WebsocketServer = new ws.Server({ noServer: true, path: '/ws' });

class WebsocketTransport extends Transport {
  constructor(options) {
    super(options);
  };

  log(info, callback) {

    setImmediate(() => {
      this.emit('logged', info);
    });

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
