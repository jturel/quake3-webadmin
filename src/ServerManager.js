const crypto = require('crypto');

class ServerManager {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  };

  createServer(server) {
    this.dbConnection.put({ ...server, _id: crypto.randomUUID() });
  };

  allServers() {
    return this.dbConnection.allDocs({ include_docs: true }).then((result) => {
      return result.rows.map((row) => {
        const id = row.doc['_id'];
        delete row.doc['_id'];
        delete row.doc['_rev'];
        return { ...row.doc, id};
      });
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

  deleteServer(uuid) {
    return this.dbConnection.get(uuid).then((doc) => {
      return this.dbConnection.remove(doc);
    });
  };
}

module.exports = ServerManager;
