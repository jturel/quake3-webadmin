import { useState } from 'react';
import { createServer } from '../lib/Api';
import { useNavigate } from 'react-router-dom';

import ServerListItemDetails from './ServerListItemDetails';
import { SERVER_OPTIONS } from '../lib/ServerOptions';

export default function CreateServerForm() {

  const [server, setServer] = useState({ vars: SERVER_OPTIONS });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createServer(server);
    navigate('/');
  };

  return (
    <div>
      <h2>Create Server</h2>
      <ServerListItemDetails handleSubmit={handleSubmit} updateServer={setServer} server={server} />
    </div>
  );
};
