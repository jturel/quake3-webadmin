import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ServerList() {

  const [servers, setServers] = useState([]);

  useEffect(() => {
    setServers(axios.get('http://localhost:3001/api/v1/servers'));
  }, []);

  return (
    <div>
     List of servers
    </div>
  );
}
