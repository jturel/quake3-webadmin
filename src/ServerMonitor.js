class ServerMonitor {
  constructor ({ serverManager }) {
    this.serverManager = serverManager;
  };

  start() {
    this.monitor = setInterval(() => {
      this.serverManager.allServers().then((servers) => {

      });
    }, 5000);
  };
};

module.exports = ServerMonitor;
