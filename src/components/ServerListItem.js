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
    <Flex>
      <Box width={1/8}>
        { name }:{ port }
      </Box>
      <Box width={1/8}>
        <Button onClick={handleLaunchServer} value={id} disabled={pid}>Launch</Button>
      </Box>
      <Box width={1/8}>
        <Button onClick={handleStopServer} value={id} disabled={!pid}>Stop</Button>
      </Box>
      <Box width={1/8}>
        <Button onClick={handleDeleteServer} value={id}>Delete</Button>
      </Box>
      <Box width={1/2} />
    </Flex>
  );
};
