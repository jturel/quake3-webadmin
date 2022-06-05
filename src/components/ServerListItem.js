import {
  Flex,
  Box,
  Button
} from 'rebass';

import React, { useState } from 'react';
import ServerListItemDetails from './ServerListItemDetails';

export default function ServerListItem({
  handleDeleteServer,
  handleLaunchServer,
  handleStopServer,
  handleUpdateVar,
  server,
}) {

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Flex mb={1}>
        <Box width={200}>
          { server.vars.sv_hostname }:{ server.vars.sv_port }
        </Box>
        <Box width={400}>
          <Button mr={1} onClick={handleLaunchServer} value={server.id} disabled={server.pid}>Launch</Button>
          <Button mr={1} onClick={handleStopServer} value={server.id} disabled={!server.pid}>Stop</Button>
          <Button mr={1} onClick={handleExpand}>Expand</Button>
          <Button onClick={handleDeleteServer} value={server.id}>Delete</Button>
        </Box>
      </Flex>
      { expanded && <ServerListItemDetails handleUpdateVar={handleUpdateVar} server={server} /> }
    </React.Fragment>
  );
};
