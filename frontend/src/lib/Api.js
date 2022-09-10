import axios from 'axios'

import { CreateServer, LaunchServer, LoadServers, UpdateServer } from '../../wailsjs/go/main/App'

const transformVar = (apiVar) => ({ name: apiVar.Name, value: apiVar.Value })

const transformVars = (apiVars) => apiVars.map((apiVar) => transformVar(apiVar))

class ServerApi {}

const transformServer = (apiServer) => ({
  id: apiServer.Uuid,
  vars: transformVars(apiServer.Vars),
})

const transformServers = (apiServers) =>
  apiServers.map((server) => transformServer(server))

const loadServers = () => LoadServers().then(transformServers)

const findServer = (uuid) =>
  axios
    .get(`http://localhost:3001/api/v1/servers/${uuid}`)
    .then((response) => response.data.result)

const createServer = (server) => CreateServer(toApiServer(server))

const updateServer = (server) => UpdateServer(server)

const deleteServer = (uuid) =>
  axios
    .delete(`http://localhost:3001/api/v1/servers/${uuid}`)
    .then((response) => response.data.result)

const launchServer = (uuid) => LaunchServer(uuid)

const stopServer = (uuid) =>
  axios
    .post(`http://localhost:3001/api/v1/servers/${uuid}/stop`)
    .then((response) => response.data.result)

const serverApi = new ServerApi()

serverApi.createServer = createServer
serverApi.deleteServer = deleteServer
serverApi.findServer = findServer
serverApi.launchServer = launchServer
serverApi.loadServers = loadServers
serverApi.stopServer = stopServer
serverApi.updateServer = updateServer

export default serverApi
