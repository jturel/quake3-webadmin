import {
  Box,
  Flex,
} from 'rebass';

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import CreateServer from './components/CreateServer';
import ServerList from './components/ServerList';

function App() {
  return (
    <BrowserRouter>
      <Flex>
        <Box width={1/4}>
          <ul>
            <li>
              <Link to="/">Servers</Link>
            </li>
            <li>
              <Link to="/servers/create">Create Server</Link>
            </li>
          </ul>
        </Box>
        <Box width={3/4}>
          <Routes>
            <Route path="/" element={<ServerList/>} />
            <Route path="/servers/create" element={<CreateServer/>} />
          </Routes>
        </Box>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
