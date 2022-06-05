import { useState } from 'react';
import { createServer } from '../lib/Api';
import { useNavigate } from 'react-router-dom';

export default function CreateServerForm() {

  const [name, setName] = useState(null);
  const [port, setPort] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createServer({
      vars: {
        sv_hostname: name,
        sv_port: port,
      },
    });
    navigate('/');
  };

  return (
    <div>
      <h2>Create Server</h2>
      <form>
        Name: <input type="text" value={name || ''} onChange={e => setName(e.target.value)} /><br />
        Port: <input type="text" value={port || ''} onChange={e => setPort(e.target.value)} /><br />
        <input type="button" onClick={handleSubmit} value="Create Server" />
      </form>
    </div>
  );
};
