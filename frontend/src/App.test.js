import React from 'react'
import { render } from '@testing-library/react'
import serverApi from './lib/Api'
import App from './App'

jest.mock('./lib/Api')

test('renders', () => {
  serverApi.loadServers.mockResolvedValue([])

  render(<App />)
})
