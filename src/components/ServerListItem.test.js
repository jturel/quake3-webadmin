import { render } from '@testing-library/react';
import ServerListItem from './ServerListItem';

test('renders a server list item', () => {
  const server = {
    vars: {},
  };

  render(<ServerListItem server={server} />);
});
