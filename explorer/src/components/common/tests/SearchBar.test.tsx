import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// common - searchBar
import { MockedProvider } from '@apollo/client/testing'
import { SearchBar } from 'common/components'
import { ChainProvider } from 'common/providers/ChainProvider'

const mockUseDomains = () => ({
  selectedChain: {
    urls: {
      page: 'gemini-3c',
    },
  },
  setSelectedChain: jest.fn(),
})

describe('Search bar', () => {
  beforeEach(() => {
    jest.mock('common/hooks/useChains', () => mockUseDomains)
  })
  it('renders properly', async () => {
    const { getByTestId } = render(
      <ChainProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <SearchBar />
        </MockedProvider>
      </ChainProvider>,
      { wrapper: BrowserRouter },
    )

    expect(getByTestId('testSearchForm')).toBeInTheDocument()
  })

  it('validate initial values of search form', async () => {
    const { getByTestId } = render(
      <ChainProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <SearchBar />
        </MockedProvider>
      </ChainProvider>,
      { wrapper: BrowserRouter },
    )

    expect(getByTestId('search-term-input').innerText).toBe(undefined)
    expect(getByTestId('search-type-list').innerText).toBe(undefined)
  })

  it('should show error message when all the fields are not entered', async () => {
    render(
      <ChainProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <SearchBar />
        </MockedProvider>
      </ChainProvider>,
      { wrapper: BrowserRouter },
    )

    // setup user actions
    const user = userEvent.setup()

    const submitBtn = await screen.findByTestId('testSearchSubmit')
    user.click(submitBtn)

    const element = await screen.findByTestId('errorMessage')

    expect(element).toBeInTheDocument()

    await expect(await screen.findByText(/search term is required/i))
  })
})
