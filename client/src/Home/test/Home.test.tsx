import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'

// home
import Home from 'Home'
import { SUCCESS_MOCK, EMPTY_MOCK, ERROR_MOCK } from 'Home/test/mocks'

it('renders without error', async () => {
  render(
    <MockedProvider mocks={[SUCCESS_MOCK]} addTypename={false}>
      <Home />
    </MockedProvider>,
    { wrapper: BrowserRouter },
  )

  expect(await screen.findByText(/latest blocks/i)).toBeInTheDocument()
})

it('Empty render', async () => {
  render(
    <MockedProvider mocks={[ERROR_MOCK]} addTypename={false}>
      <Home />
    </MockedProvider>,
    { wrapper: BrowserRouter },
  )
  expect(await screen.findByText(/oops something went wrong./i)).toBeInTheDocument()
})

it('Error render', async () => {
  render(
    <MockedProvider mocks={[EMPTY_MOCK]} addTypename={false}>
      <Home />
    </MockedProvider>,
    { wrapper: BrowserRouter },
  )
  expect(await screen.findByText(/oops something went wrong./i)).toBeInTheDocument()
})
