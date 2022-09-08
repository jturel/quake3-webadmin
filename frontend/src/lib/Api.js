import axios from 'axios';

import { LoadServers } from "../../wailsjs/go/main/App";

export const loadServers = () => {
  return LoadServers();
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
