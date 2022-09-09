import React from 'react'
import { render } from '@testing-library/react'
import ServerListItem from './ServerListItem'

test('renders a server list item', () => {
  const server = {
    vars: [
      {
        name: 'sv_hostname',
        value: 'example.com',
      },
      {
        name: 'net_port',
        value: '27960',
      },
    ],
  }

  render(<ServerListItem server={server} />)
})
