import {
  Flex,
  Box,
  Button
} from 'rebass';

export default function ServerListItem({ id, name, port, handleDeleteServer }) {
  return (
    <Flex>
      <Box width={1/6}>
        { name }:{ port }
      </Box>
      <Box width={1/6}>
        <Button>Launch</Button>
      </Box>
      <Box width={1/6}>
        <Button onClick={handleDeleteServer} value={id}>Delete</Button>
      </Box>
      <Box width={1/2} />
    </Flex>
  );
};
