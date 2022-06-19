module.exports = () => {
  return {
    'dbPath': process.env.Q3WEBADMIN_DB_PATH || '/home/jturel/.config/quake3-webadmin/pouchdb',
    'baseQ3Path': '/home/jturel/.q3a/baseq3',
    'quakeExecutable': '/home/jturel/code/ioq3-main/build/release-linux-x86_64/ioq3ded.x86_64',
  };
};
