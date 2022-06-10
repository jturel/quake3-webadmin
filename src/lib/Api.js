import axios from 'axios';

export const loadServers = () => {
  return axios.get('http://localhost:3001/api/v1/servers').then((response) => {
    return response.data.result;
  });
};

export const findServer = (uuid) => {
  return axios.get(`http://localhost:3001/api/v1/servers/${uuid}`).then((response) => {
    return response.data.result;
  });
};

export const createServer = (server) => {
  const cleaned = { ...server, vars: server.vars.filter((v) => v !== null) };
  return axios.post('http://localhost:3001/api/v1/servers', cleaned).then((response) => {
    return response.data.result;
  });
};

export const updateServer = (server) => {
  const cleaned = { ...server, vars: server.vars.filter((v) => v !== null) };
  return axios.put(`http://localhost:3001/api/v1/servers/${server.id}`, cleaned).then((response) => {
    return response.data.result;
  });
};

export const deleteServer = (uuid) => {
  return axios.delete(`http://localhost:3001/api/v1/servers/${uuid}`).then((response) => {
    return response.data.result;
  });
};

export const launchServer = (uuid) => {
  return axios.post(`http://localhost:3001/api/v1/servers/${uuid}/launch`).then((response) => {
    return response.data.result;
  });
};

export const stopServer = (uuid) => {
  return axios.post(`http://localhost:3001/api/v1/servers/${uuid}/stop`).then((response) => {
    return response.data.result;
  });
};
