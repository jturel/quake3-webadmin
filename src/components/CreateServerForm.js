import { useState } from 'react';
import { createServer } from '../lib/Api';

export default function CreateServerForm() {

  const [name, setName] = useState(null);
  const [port, setPort] = useState(null);

  const handleSubmit = () => {
    createServer({ ...name, ...port});
  };

  return (
    <div>
      <form>
        Name: <input type="text" value={name || ''} onChange={e => setName(e.target.value)} /><br />
        Port: <input type="text" value={port || ''} onChange={e => setPort(e.target.value)} />
        <input type="button" onClick={handleSubmit} value="Create Server" />
      </form>
    </div>
  );
};
