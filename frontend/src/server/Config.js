const dotenv = require('dotenv');
const fs = require('fs');

const dbDir = './db';

const dbPath = (() => {
  if (process.env.NODE_ENV === "test") {
    return `${dbDir}/pouchdb.test`;
  }

  return `${dbDir}/pouchdb`;
})();

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

dotenv.config();

const getRequired = (configKey) => {
  if (!process.env[configKey]) {
    throw new Error(`${configKey} wasn't specified in the environment`);
  }

  return process.env[configKey];
};

const ensureFileExists = (path) => {
  if (!fs.existsSync(path)) {
    throw new Error(`${path} doesn't exist`);
  }
}

const baseQ3Path = getRequired('Q3WEBADMIN_BASEQ3_PATH');
ensureFileExists(baseQ3Path);

const q3Executable = getRequired('Q3WEBADMIN_EXECUTABLE_PATH');
ensureFileExists(q3Executable);

module.exports = () => {
  return {
    dbPath,
    baseQ3Path,
    q3Executable,
  };
};
