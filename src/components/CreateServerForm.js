import { useState } from 'react';
import { createServer } from '../lib/Api';
import { useNavigate } from 'react-router-dom';

import ServerListItemDetails from './ServerListItemDetails';
import { SERVER_OPTIONS } from '../shared/ServerOptions';

export default function CreateServerForm({addNotification}) {
  const defaultOptions = () => {
    let options = {};
    SERVER_OPTIONS.forEach((o) => {
      options[o.name] = o.default;
    });
    return options;
  };

  const [server, setServer] = useState({ vars: defaultOptions() });

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
