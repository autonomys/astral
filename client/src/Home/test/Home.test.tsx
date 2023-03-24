import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'

// home
import Home from 'Home'
import { SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE } from 'Home/test/mocks'
import { ChainProvider } from 'common/providers/ChainProvider'

const mockUseDomains = () => ({
  selectedChain: {
    urls: {
      page: 'gemini-3c',
    },
  },
  setSelectedChain: jest.fn(),
})

describe('Home unit tests', () => {
  beforeEach(() => {
    jest.mock('common/hooks/useDomains', () => mockUseDomains)
  })

  it('renders without error', async () => {
    render(
      <ChainProvider>
        <MockedProvider mocks={[SUCCESS_MOCK_DESKTOP, SUCCESS_MOCK_MOBILE]} addTypename={false}>
          <Home />
        </MockedProvider>
      </ChainProvider>,
      { wrapper: BrowserRouter },
    )

    expect(await screen.findByText(/latest blocks/i)).toBeInTheDocument()
    expect(await screen.findByText(/latest extrinsics/i)).toBeInTheDocument()
  })
})
