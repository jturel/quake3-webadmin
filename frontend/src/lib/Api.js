import axios from 'axios';

import { LoadServers } from "../../wailsjs/go/main/App";

const transformVar = (apiVar) => {
  return { name: apiVar.Name, value: apiVar.Value };
};

const transformVars = (apiVars) => {
  return apiVars.map(apiVar => transformVar(apiVar));
};

const transformServer = (apiServer) => {
  return {
    uuid: apiServer.Uuid,
    vars: transformVars(apiServer.Vars),
  };
};

const transformServers = (apiServers) => {
  return apiServers.map(server => transformServer(server));
};

export const loadServers = () => {
  return LoadServers().then(transformServers);
};

export const findServer = (uuid) => {
  return axios.get(`http://localhost:3001/api/v1/servers/${uuid}`).then((response) => {
    return response.data.result;
  });
};

export const createServer = (server) => {
  return axios.post('http://localhost:3001/api/v1/servers', server).then((response) => {
    return response.data.result;
  });
};

export const updateServer = (server) => {
  return axios.put(`http://localhost:3001/api/v1/servers/${server.id}`, server).then((response) => {
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
