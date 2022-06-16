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

import { useEffect, useRef } from 'react';

import CreateServerForm from './components/CreateServerForm';
import NotificationsSidebar from './components/NotificationsSidebar';
import ServerList from './components/ServerList';
import useNotifications from './useNotifications';

function App() {
  const [notifications, addNotification] = useNotifications();
  const ws = useRef(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:3001/ws");
      ws.current.onopen = () => console.log("Opened WebSocket connection.");
      ws.current.onclose = () => console.log("Closed WebSocket connection.");
      ws.current.onmessage = (event) => {
        console.log(event.data);
        addNotification(JSON.parse(event.data).message);
      };

      return () => {
        if (ws.current.readyState === 1) {
          ws.current.close();
        }
      };
    }
  }, [addNotification]);

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
