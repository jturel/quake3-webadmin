const os = require('os');

module.exports = () => {
  const homeDir = os.homedir();
  const configDir = '.config';
  const configPath = `${homeDir}/${configDir}/quake3-webadmin`;

  return {
    'dbPath': process.env.Q3WEBADMIN_DB_PATH || `${configPath}/pouchdb`,
    'baseQ3Path': '/home/jturel/.q3a/baseq3',
    'quakeExecutable': '/home/jturel/code/ioq3-main/build/release-linux-x86_64/ioq3ded.x86_64',
  };
};
