const os = require('os');
const path = require('node:path');
const fs = require('fs');

const dbPath = path.join(
  os.tmpdir(),
  'quake3-webadmin/pouchdb',
);

process.env.Q3WEBADMIN_DB_PATH = dbPath;

const configBase = path.join(os.tmpdir(), 'quake3-webadmin');

if (!fs.existsSync(configBase)) {
  fs.mkdirSync(configBase);
}

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

const { app, closeDbConnection } = require('./App');
const supertest = require('supertest');
const api = supertest.agent(app);

afterAll(async () => {
  await closeDbConnection();
});

test('lists servers', (done) => {
  api
    .get('/api/v1/servers')
    .expect(200, done);
});

test('creates servers', (done) => {
  api
    .get('/api/v1/servers')
    .expect(200, done);
});
