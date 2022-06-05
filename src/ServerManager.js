const crypto = require('crypto');
const { spawn } = require('node:child_process');

class ServerManager {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
    this.runningServers = {};
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
      server.id = server._id;
      delete server._id;
      delete server._rev;
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

  cleanupServer(uuid) {
    const server = this.runningServers[uuid];
    if (server) {
      delete this.runningServers[uuid];
      console.log(`Cleaned up server=${uuid} pid=${server.pid}`);
    }
  };

  isPidRunning(pid) {
    try {
      process.kill(pid, 0);
      return true;
    } catch(e) {
      return false;
    }
  };

  clearServerPid(uuid) {
    return this.dbConnection.get(uuid).then((doc) => {
      delete doc.pid;
      this.dbConnection.put(doc);
    });
  };

  stopServer(uuid) {
    this.dbConnection.get(uuid).then((doc) => {
      if (doc.pid) {
        if (this.isPidRunning(doc.pid)) {
          process.kill(doc.pid);
        }

        this.clearServerPid(uuid).then(() => {
          console.log(`Stopped server=${uuid} pid=${doc.pid}`);
        });
      } else {
        console.log("Server wasn't running");
      }
    });
  };

  launchServer(uuid) {
    return this.dbConnection.get(uuid).then((doc) => {
      console.log(`Launching server=${uuid}`);

      const exec = '/home/jturel/code/ioq3-main/build/release-linux-x86_64/ioq3ded.x86_64';
      const server = spawn(exec, ['+exec', 'server.cfg']); 

      server.on('close', () => {
        this.clearServerPid(uuid).then(() => {
          console.log(`Cleared PID for server=${uuid} pid=${server.pid}`);
        });
      });

      doc.pid = server.pid
      this.dbConnection.put(doc);

      console.log(`Launched server=${uuid} pid=${server.pid}`);
      return true;
    });
  };
}

module.exports = ServerManager;
