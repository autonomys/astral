import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'

// home
import { BlockList } from 'Block/components'
import { SUCCESS_MOCK, EMPTY_MOCK, ERROR_MOCK } from 'Block/tests/mocks'

describe('Block list rendering tests', () => {
  it('renders without error', async () => {
    render(
      <MockedProvider mocks={[SUCCESS_MOCK]} addTypename={false}>
        <BlockList />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )
    // expect(await screen.findByText(/latest blocks/i)).toBeInTheDocument()
  })

  it('Empty render', async () => {
    render(
      <MockedProvider mocks={[ERROR_MOCK]} addTypename={false}>
        <BlockList />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )
    // expect(await screen.findByText('Latest Blocks')).toBeInTheDocument()
  })

  it('Error render', async () => {
    render(
      <MockedProvider mocks={[EMPTY_MOCK]} addTypename={false}>
        <BlockList />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )
    // expect(await screen.findByText('Latest Blocks')).toBeInTheDocument()
  })
})
