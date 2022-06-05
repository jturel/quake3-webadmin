import {
  Flex,
  Box,
  Button
} from 'rebass';

export default function ServerListItem({
  id,
  name,
  pid,
  port,
  handleDeleteServer,
  handleLaunchServer,
  handleStopServer,
  isRunning,
}) {

  return (
    <Flex mb={1}>
      <Box width={200}>
        { name }:{ port }
      </Box>
      <Box width={300}>
        <Button mr={1} onClick={handleLaunchServer} value={id} disabled={pid}>Launch</Button>
        <Button mr={1} onClick={handleStopServer} value={id} disabled={!pid}>Stop</Button>
        <Button onClick={handleDeleteServer} value={id}>Delete</Button>
      </Box>
    </Flex>
  );
};
