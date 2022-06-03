import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the create server link', () => {
  render(<App />);
  const linkElement = screen.getByText(/create server/i);
  expect(linkElement).toBeInTheDocument();
});
