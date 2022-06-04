import { useEffect, useState } from 'react';
import { loadServers } from '../lib/Api';
import ServerListItem from './ServerListItem';

export default function ServerList() {

  const [servers, setServers] = useState([]);

  useEffect(() => {
    (async () => {
      setServers(await loadServers());
    })();
  }, []);

  return (
    <div>
      <h2>Dedicated Servers</h2>
      { servers.map((server) => <ServerListItem key={server.id} {...server} />) }
    </div>
  );
}
