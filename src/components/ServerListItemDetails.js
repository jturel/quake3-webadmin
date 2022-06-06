import {
  Flex,
  Box,
  Button,
} from 'rebass';

import {
  Input,
  Label,
} from '@rebass/forms';

import { updateServer } from '../lib/Api';

export default function ServerListItemDetails({ handleUpdateVar, server }) {
  const handleUpdate = async (event) => {
    await updateServer(server);

    event.preventDefault();
  };

  const varFields = () => {
    return Object.keys(server.vars).map((varName) => {
      return (
        <Box px={2}>
          <Label>{varName}</Label>
          <Input
            value={server.vars[varName] || ''}
            name={varName}
            onChange={(e) => handleUpdateVar(server.id, e)}
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
      as="form"
      pb={2}
      onSubmit={(e) => e.preventDefault()}
    >
      { groupedVarFields() }
      <Flex>
        <Box px={2} width={1}>
          <Button onClick={handleUpdate}>Save</Button>
        </Box>
      </Flex>
    </Box>
  );
};
