const crypto = require('crypto');
const { spawn } = require('node:child_process');
const fs = require('fs');
const ApiServerPresenter = require('./ApiServerPresenter');

const logger = require('./lib/Logger')

class ServerManager {
  constructor({ db, executable, configPath }) {
    this.db = db;
    this.executable = executable;
    this.configPath = configPath;
  };

  createServer(server) {
    return this.db.put({ ...server, _id: crypto.randomUUID() })
      .then((result) => {
        logger.info("Created server", { uuid: result.id });
      });
  };

  allServers() {
    return this.db
      .allDocs({ include_docs: true })
      .then((result) => result.rows.map((r) => r.doc));
  };

  findServer(uuid) {
    return this.db.get(uuid).then((server) => {
      return server;
    }).catch((error) => {
      logger.error(error);
      return null;
    });
  };

  updateServer(server) {
    return this.db.get(server.id).then((doc) => {
      const updated = {...doc, vars: server.vars };

      return this.db.put(updated).then((result) => {
        logger.info("Updated server", { uuid: server.id, pid: server.pid });

        return true;
      });
    });
  };

  deleteServer(uuid) {
    return this.db.get(uuid).then((doc) => {
      return this.db.remove(doc).then(() => {
        logger.info("Deleted server", { uuid });
      });
    });
  };

  cleanupServer(uuid) {
    const server = this.runningServers[uuid];
    if (server) {
      delete this.runningServers[uuid];
      logger.info(`Cleaned up server=${uuid} pid=${server.pid}`);
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
    return this.db.get(uuid).then((doc) => {
      delete doc.pid;
      this.db.put(doc);
    });
  };

  stopServer(uuid) {
    this.db.get(uuid).then((doc) => {
      if (doc.pid) {
        if (this.isPidRunning(doc.pid)) {
          process.kill(doc.pid);
        }

        this.clearServerPid(uuid).then(() => {
          logger.info('Stopped server', { server: uuid, pid: doc.pid});
        });
      } else {
        logger.info("Server wasn't running", { server: uuid, pid: null });
      }
    });
  };

  writeConfig(configFile, doc) {
    const vars = Object.keys(doc.vars || {});

    const content = vars
      .map((k) => `seta ${k} ${doc.vars[k]}`)
      .join("\n");

    try {
      fs.writeFileSync(configFile, content);
    } catch (error) {
      logger.error(`Unable to write config to ${configFile}`);
      return false;
    }

    logger.info(`Wrote ${configFile}`);
    return true;
  };

  launchServer(uuid) {
    return this.db.get(uuid).then((doc) => {
      logger.info('Launching server', { server: uuid });

      const configName = `server-${uuid}.cfg`
      const configFile = `${this.configPath}/${configName}`;
      if(!this.writeConfig(configFile, doc)) {
        return false;
      };

      const server = spawn(this.executable, ['+exec', configName]); 

      doc.pid = server.pid
      this.db.put(doc);

      logger.info('Launched server', { server: uuid, pid: server.pid });
    });
  };
}

module.exports = ServerManager;
