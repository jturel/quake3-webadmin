process.env.Q3WEBADMIN_API_PORT = 3002;
process.env.Q3WEBADMIN_API_DB = '/home/jturel/.config/quake3-webadmin/pouchdb.test';

const server = require('./Server');
const supertest = require('supertest');
const api = supertest.agent(server);

describe('api/v1', () => {
  it('lists servers', (done) => {
    api
      .get('/api/v1/servers')
      .expect(200, done);
  });
});
