class ServerManager {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  };

  createServer(server) {
    this.dbConnection.put(server);
  };

  allServers() {
    return this.dbConnection.allDocs().then((result) => {
      return result.rows;
    });
  };

  findServer(uuid) {
    return this.dbConnection.get(uuid).then((server) => {
      return server;
    }).catch((error) => {
      console.log(error);
      return null;
    });
  };
}

module.exports = ServerManager;
