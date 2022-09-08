import axios from 'axios'

import { LoadServers } from '../../wailsjs/go/main/App'

const transformVar = (apiVar) => ({ name: apiVar.Name, value: apiVar.Value })

const transformVars = (apiVars) => apiVars.map((apiVar) => transformVar(apiVar))

const transformServer = (apiServer) => ({
  uuid: apiServer.Uuid,
  vars: transformVars(apiServer.Vars),
})

const transformServers = (apiServers) =>
  apiServers.map((server) => transformServer(server))

export const loadServers = () => LoadServers().then(transformServers)

export const findServer = (uuid) =>
  axios
    .get(`http://localhost:3001/api/v1/servers/${uuid}`)
    .then((response) => response.data.result)

export const createServer = (server) =>
  axios
    .post('http://localhost:3001/api/v1/servers', server)
    .then((response) => response.data.result)

export const updateServer = (server) =>
  axios
    .put(`http://localhost:3001/api/v1/servers/${server.id}`, server)
    .then((response) => response.data.result)

export const deleteServer = (uuid) =>
  axios
    .delete(`http://localhost:3001/api/v1/servers/${uuid}`)
    .then((response) => response.data.result)

export const launchServer = (uuid) =>
  axios
    .post(`http://localhost:3001/api/v1/servers/${uuid}/launch`)
    .then((response) => response.data.result)

export const stopServer = (uuid) =>
  axios
    .post(`http://localhost:3001/api/v1/servers/${uuid}/stop`)
    .then((response) => response.data.result)
