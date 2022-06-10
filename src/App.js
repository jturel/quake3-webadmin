import {
  Box,
  Button,
  Flex,
} from 'rebass';

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import CreateServerForm from './components/CreateServerForm';
import ServerList from './components/ServerList';

function App() {
  return (
    <BrowserRouter>
      <Flex>
        <Box width={1} display="flex" flexDirection="row-reverse">
          <Link to="/servers/create">
            <Button>
              Create Server
            </Button>
          </Link>
        </Box>
        <Box width={1600}>
          <Routes>
            <Route path="/" element={<ServerList/>} />
            <Route path="/servers/create" element={<CreateServerForm/>} />
          </Routes>
        </Box>
        <Box width={1} />
      </Flex>
    </BrowserRouter>
  );
}

export default App;
