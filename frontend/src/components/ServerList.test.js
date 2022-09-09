import React from 'react'
import { act, render } from '@testing-library/react'
import ServerList from './ServerList'

const mockServerApi = {
  loadServers: jest.fn(() => Promise.resolve([])),
}

test('renders the server list', () => {
  act(() => {
    render(<ServerList serverApi={mockServerApi} />)
  })
})
