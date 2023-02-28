import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'

// home
import { BlockList } from 'Block/components'
import { SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE } from 'Block/tests/mocks'

describe('Block list rendering tests', () => {
  it('renders without error', async () => {
    render(
      <MockedProvider mocks={[SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE]} addTypename={false}>
        <BlockList />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )

    expect(await screen.findByTestId('latest-blocks-0')).toBeInTheDocument()
  })
})
