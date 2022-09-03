import { render } from '@testing-library/react';
import CreateServerForm from './CreateServerForm';
import { BrowserRouter } from 'react-router-dom';

test('renders the form', () => {
  render(
    <BrowserRouter>
      <CreateServerForm />
    </BrowserRouter>
  );
});
