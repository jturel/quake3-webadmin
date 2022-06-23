const q3Executable = '/tmp/mock-q3ded.sh';
process.env.Q3WEBADMIN_BASEQ3_PATH = '/tmp';
process.env.Q3WEBADMIN_EXECUTABLE_PATH = q3Executable;

const fs = require('fs');
fs.copyFileSync('./mock-q3ded.sh', q3Executable);

const { app, closeDbConnection } = require('./App');
const supertest = require('supertest');
const api = supertest.agent(app);
const { SERVER_OPTIONS } = require('../shared/ServerOptions');

const createServer = () => {
  let data = {
    vars: {},
  };

  SERVER_OPTIONS.forEach((option) => {
    data.vars[option.name] = 'something!';
  });

  return api
    .post('/api/v1/servers')
    .send(data);
};

afterAll(async () => {
  await closeDbConnection();
  fs.unlinkSync(q3Executable);
});

test('lists servers', (done) => {
  api
    .get('/api/v1/servers')
    .expect(200, done);
});

test('creates servers', (done) => {
  createServer().expect(200, done);
});

test('deletes servers', (done) => {
  createServer().then((response) => {
    const uuid = response.body.result;
    api
      .delete(`/api/v1/servers/${uuid}`)
      .expect(200, done);
  });
});

test('launches servers', (done) => {
  let uuid;
  createServer().then((response) => {
    uuid = response.body.result;
    return api
      .post(`/api/v1/servers/${uuid}/launch`)
      .expect(200);
  }).finally(() => {
    if (uuid) {
      api.post(`/api/v1/servers/${uuid}/stop`);
    }
    done();
  });
});

test('loads servers', (done) => {
  createServer().then((response) => {
    const uuid = response.body.result;
    api
      .get(`/api/v1/servers/${uuid}`)
      .expect(200, done);
  });
});
