const crypto = require('crypto');
const { spawn } = require('node:child_process');
const fs = require('fs');
const ApiServerPresenter = require('./ApiServerPresenter');

const logger = require('./lib/Logger')();

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
    return this.stopServer(uuid).then((result) => {
      return this.db.get(uuid).then((doc) => {
        return this.db.remove(doc).then((result) => {
          const configName = `server-${uuid}.cfg`
          const configFile = `${this.configPath}/${configName}`;

          try {
            if (fs.existsSync(configFile)) {
              this.deleteConfig(configFile);
            }
          } catch(e) {
            logger.error(`Couldn't read ${configFile}`);
          }

          logger.info("Deleted server", { uuid });
        });
      });
    });
  };

  isPidRunning(pid) {
    try {
      process.kill(pid, 0);
      return true;
    } catch(e) {
      return false;
    }
  };

  stopServer(uuid) {
    return this.db.get(uuid).then((doc) => {
      if (doc.pid) {
        if (this.isPidRunning(doc.pid)) {
          process.kill(doc.pid);
        }

        delete doc.pid;
        return this.db.put(doc).then((result) => {
          logger.info('Stopped server', { server: uuid, pid: doc.pid});
          return result;
        });
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

  deleteConfig(configFile) {
    try {
      fs.unlinkSync(configFile);
      logger.info(`Deleted ${configFile}`)
    } catch(e) {
      logger.error(`Couldn't delete ${configFile}`)
    }
  };

  launchServer(uuid) {
    return this.db.get(uuid).then((doc) => {
      logger.info('Launching server', { server: uuid });

      const configName = `server-${uuid}.cfg`
      const configFile = `${this.configPath}/${configName}`;
      if(!this.writeConfig(configFile, doc)) {
        return false;
      };

      let options = ['+exec', configName];
      
      // TODO store metadata for which vars need to be on the executable
      if (doc.vars['map']) {
        options.push('+map');
        options.push(doc.vars['map']);
      };

      const server = spawn(this.executable, options); 

      doc.pid = server.pid
      this.db.put(doc);

      logger.info('Launched server', { server: uuid, pid: server.pid });
    });
  };
}

module.exports = ServerManager;
