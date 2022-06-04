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

  const deleteServer = (event) => {
    console.log(event.target.value);
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
              deleteServer={deleteServer}
              {...server}
            />
          )
        }
      </Box>
    </Flex>
  );
}
