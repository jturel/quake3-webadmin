const os = require('os');
const tmpdir = os.tmpdir();
const path = require('path');
const q3Executable = path.join(
  __dirname,
  (process.platform === 'win32')
    ? '../../mock-q3ded.bat'
    : '../../mock-q3ded.sh'
);

process.env.Q3WEBADMIN_BASEQ3_PATH = tmpdir;
process.env.Q3WEBADMIN_EXECUTABLE_PATH = q3Executable;

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

test('launches servers', async () => {
  const response = await createServer();
  const uuid = response.body.result;
  await api.post(`/api/v1/servers/${uuid}/launch`).expect(200);
  await api.post(`/api/v1/servers/${uuid}/stop`).expect(200);
});

test('loads servers', (done) => {
  createServer().then((response) => {
    const uuid = response.body.result;
    api
      .get(`/api/v1/servers/${uuid}`)
      .expect(200, done);
  });
});
