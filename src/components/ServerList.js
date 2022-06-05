import { useEffect, useState } from 'react';
import {
  deleteServer,
  findServer,
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

  const reloadServer = async(uuid) => {
    const reloaded = await findServer(uuid);

    setServers((prevServers) => {
      return prevServers.map((s) => {
        if (s.id === reloaded.id) {
          return reloaded;
        }

        return s;
      });
    });
  };

  const handleLaunchServer = async (event) => {
    await launchServer(event.target.value);
    await reloadServer(event.target.value);

    event.preventDefault();
  };

  const handleStopServer = async (event) => {
    await stopServer(event.target.value);
    await reloadServer(event.target.value);

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
