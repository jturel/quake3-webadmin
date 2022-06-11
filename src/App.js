import {
  Box,
  Flex,
  Heading,
  Text,
} from 'rebass';

import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
} from 'react-router-dom';

import CreateServerForm from './components/CreateServerForm';
import NotificationsSidebar from './components/NotificationsSidebar';
import ServerList from './components/ServerList';
import useNotifications from './useNotifications';

function App() {
  //const ws = new WebSocket("wss://localhost");
  const [notifications, addNotification] = useNotifications();

  return (
    <BrowserRouter>
      <Flex>
        <Box textAlign="center" width={1}>
          <Heading>Quake 3 Web Admin</Heading>
        </Box>
      </Flex>
      <Flex>
        <Box width={1}>
        </Box>
        <Box width={1600}>
          <Flex mb={3} mt={3}>
            <RouterLink to="/servers/create">
              <Text m={1}>
                Create Server
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text m={1}>
                Server List
              </Text>
            </RouterLink>
          </Flex>
          <Flex>
            <Routes>
              <Route path="/" element={<ServerList addNotification={addNotification} />} />
              <Route path="/servers/create" element={<CreateServerForm addNotification={addNotification} />} />
            </Routes>
          </Flex>
        </Box>
        <Box width={1}>
          <NotificationsSidebar notifications={notifications} />
        </Box>
      </Flex>
    </BrowserRouter>
  );
}

export default App;
