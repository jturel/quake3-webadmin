import { useEffect, useState } from 'react';
import {
  deleteServer,
  launchServer,
  loadServers,
  stopServer,
} from '../lib/Api';
import ServerListItem from './ServerListItem';
import {
  Box,
  Flex,
  Heading
} from 'rebass';

export default function ServerList() {

  const [servers, setServers] = useState([]);

  useEffect(() => {
    (async () => {
      setServers(await loadServers());
    })();
  }, []);

  const handleDeleteServer = async (event) => {
    await deleteServer(event.target.value);
    setServers(servers.filter((server) => server.id !== event.target.value));
    event.preventDefault();
  };

  const handleLaunchServer = async (event) => {
    await launchServer(event.target.value);

    // change this to load one server
    setServers(await loadServers());
    event.preventDefault();
  };

  const handleStopServer = async (event) => {
    await stopServer(event.target.value);
    setServers(await loadServers());

    event.preventDefault();
  };

  return (
    <Flex>
      <Box width={1}>
        <Heading>Dedicated Servers</Heading>
        {
          servers.map((server) => 
            <ServerListItem
              key={server.id}
              handleLaunchServer={handleLaunchServer}
              handleDeleteServer={handleDeleteServer}
              handleStopServer={handleStopServer}
              {...server}
            />
          )
        }
      </Box>
    </Flex>
  );
}
