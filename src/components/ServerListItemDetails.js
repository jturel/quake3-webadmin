import {
  Flex,
  Box,
  Button,
} from 'rebass';

import {
  Input,
  Label,
} from '@rebass/forms';

import { SERVER_OPTIONS } from '../lib/ServerOptions';

export default function ServerListItemDetails({ updateServer, handleSubmit, server }) {
  const handleUpdateVar = (event) => {
    updateServer({
      ...server,
      vars: {
        ...server.vars,
        [event.target.name]: event.target.value,
      }
    });
  };

  const varFields = () => {
    return SERVER_OPTIONS.map((option) => {
      return (
        <Box px={2}>
          <Label>{option.name}</Label>
          <Input
            value={server.vars[option.name] || ''}
            name={option.name}
            onChange={handleUpdateVar}
          />
        </Box>
      );
    });
  };

  const groupedVarFields = () => {
    const fields = varFields();
    let grouped = [];

    for (let i = 0; i < fields.length; i += 3) {
      grouped.push(
        <Flex key={i}>
          {fields[i]}
          {fields[i+1]}
          {fields[i+2]}
        </Flex>
      );
    }

    return grouped;
  };

  return(
    <Box
      pb={2}
    >
      <Box height={300} overflow="auto">
        { groupedVarFields() }
      </Box>
      <Box pt={4}>
        <Button value={server.id} onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};
