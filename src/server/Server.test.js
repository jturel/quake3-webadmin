process.env.Q3WEBADMIN_API_DB = '/home/jturel/.config/quake3-webadmin/pouchdb.test';

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
