import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

// common - searchBar
import { SearchBar } from 'common/components'
import { MockedProvider } from '@apollo/client/testing'

describe('Search bar', () => {
  it('renders properly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchBar />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )

    expect(getByTestId('testSearchForm')).toBeInTheDocument()
  })

  it('validate initial values of search form', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchBar />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )

    expect(getByTestId('search-term-input').innerText).toBe(undefined)
    expect(getByTestId('search-type-list').innerText).toBe(undefined)
  })

  it('should show error message when all the fields are not entered', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchBar />
      </MockedProvider>,
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
