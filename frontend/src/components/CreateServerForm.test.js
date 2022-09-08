import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CreateServerForm from './CreateServerForm'

test('renders the form', () => {
  render(
    <BrowserRouter>
      <CreateServerForm />
    </BrowserRouter>,
  )
})
