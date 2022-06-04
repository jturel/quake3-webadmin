import axios from 'axios';

export const loadServers = () => {
  return axios.get('http://localhost:3001/api/v1/servers').then((response) => {
    return response.data.result;
  });
};

export const createServer = (server) => {
  return axios.post('http://localhost:3001/api/v1/servers', server).then((response) => {
    return response.data.result;
  });
};

export const deleteServer = (uuid) => {
  return axios.delete(`http://localhost:3001/api/v1/servers/${uuid}`).then((response) => {
    return response.data.result;
  });
};
