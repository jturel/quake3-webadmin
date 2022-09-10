import React, { useEffect, useState } from 'react';
import ServerListItem from './ServerListItem';
import CreateServerForm from './CreateServerForm';

import {
  Box,
  Flex,
  Heading
} from 'rebass';

export default function ServerList({ serverApi, addNotification }) {
  const [servers, setServers] = useState([]);
  const [creating] = useState(false);

  useEffect(() => {
   serverApi.loadServers().then(setServers);
  }, []);

  const handleDeleteServer = async (event) => {
    await serverApi.deleteServer(event.target.value);
    setServers(servers.filter((server) => server.id !== event.target.value));
  };

  const handleSaveServer = async (event) => {
    const server = servers.find((s) => s.id === event.target.value);
    await serverApi.updateServer(server);
  };

  const updateServer = (server) => {
    setServers((prevServers) => {
      return prevServers.map((prev) => {
        if (prev.id === server.id) {
          return server;
        } else {
          return prev;
        }
      });
    });
  };

  const reloadServer = async(id) => {
    const reloaded = await serverApi.findServer(id);
    updateServer(reloaded);
  };

  const handleLaunchServer = async (event) => {
    await serverApi.launchServer(event.target.value);
    await reloadServer(event.target.value);
  };

  const handleStopServer = async (event) => {
    await serverApi.stopServer(event.target.value);
    await reloadServer(event.target.value);
  };

  return (
    <Flex name="server-list">
      <Box width={1} ml="auto">
        <Heading>Dedicated Servers</Heading>
        { creating && <CreateServerForm /> }
        {
          servers.map((server) => 
            <ServerListItem
              key={server.id}
              handleLaunchServer={handleLaunchServer}
              handleDeleteServer={handleDeleteServer}
              handleStopServer={handleStopServer}
              handleSaveServer={handleSaveServer}
              handleUpdateServer={updateServer}
              server={server}
            />
          )
        }
      </Box>
    </Flex>
  );
}
