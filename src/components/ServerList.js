import { useEffect, useState } from 'react';
import ServerListItem from './ServerListItem';
import { loadServers } from '../lib/Api';

export default function ServerList() {

  const [servers, setServers] = useState([]);

  useEffect(() => {
    (async () => {
      setServers(await loadServers());
    })();
  }, []);

  return (
    <div>
     List of servers
    { servers.map((server) => <ServerListItem {...server} />) }
    </div>
  );
}
