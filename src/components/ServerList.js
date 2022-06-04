import { useEffect, useState } from 'react';
import { deleteServer, loadServers } from '../lib/Api';
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
    event.preventDefault();
    setServers(servers.filter((server) => server.id !== event.target.value));
  };

  return (
    <Flex>
      <Box width={1}>
        <Heading>Dedicated Servers</Heading>
        {
          servers.map((server) => 
            <ServerListItem
              key={server.id}
              handleDeleteServer={handleDeleteServer}
              {...server}
            />
          )
        }
      </Box>
    </Flex>
  );
}
