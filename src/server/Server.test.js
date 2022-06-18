process.env.Q3WEBADMIN_API_PORT = 3002;
process.env.Q3WEBADMIN_API_DB = '/home/jturel/.config/quake3-webadmin/pouchdb.test';

const server = require('./Server');
const supertest = require('supertest');
const api = supertest.agent(server);

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
