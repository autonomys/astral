import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'

// home
import { BlockList } from 'Block/components'
import { SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE } from 'Block/tests/mocks'
import { ChainProvider } from 'common/providers/ChainProvider'

const mockUseDomains = () => ({
  selectedChain: {
    urls: {
      page: 'gemini-3c',
    },
  },
  setSelectedChain: jest.fn(),
})

describe('Block list rendering tests', () => {
  beforeEach(() => {
    jest.mock('common/hooks/useDomains', () => mockUseDomains)
  })
  it('renders without error', async () => {
    render(
      <ChainProvider>
        <MockedProvider mocks={[SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE]} addTypename={false}>
          <BlockList />
        </MockedProvider>
      </ChainProvider>,
      { wrapper: BrowserRouter },
    )

    expect(await screen.findByTestId('latest-blocks-0')).toBeInTheDocument()
  })
})
