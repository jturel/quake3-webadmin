import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ServerListItemDetails from './ServerListItemDetails';
import { SERVER_OPTIONS } from '../shared/ServerOptions';

export default function CreateServerForm({ createServer, addNotification}) {
  const [server, setServer] = useState({ vars: SERVER_OPTIONS });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createServer(server);
    addNotification('Server created');
    navigate('/');
  };

  return (
    <div>
      <h2>Create Server</h2>
      <ServerListItemDetails handleSubmit={handleSubmit} updateServer={setServer} server={server} />
    </div>
  );
};
