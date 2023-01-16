import { render, screen, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// common - table
import { SearchBar } from 'common/components'
import { MockedProvider } from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'

describe('Search bar', () => {
  it('renders properly', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchBar />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )
    const element = await screen.findByTestId('testSearchForm')

    expect(element).toBeInTheDocument()
  })

  it('should show error message when all the fields are not entered', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchBar />
      </MockedProvider>,
      { wrapper: BrowserRouter },
    )

    const submitBtn = await screen.findByTestId('testSearchSubmit')
    userEvent.click(submitBtn)

    const element = await screen.findByTestId('errorMessage')

    expect(element).toBeInTheDocument()

    await expect(await screen.findByText(/search term is required/i))
  })

  //   it('test table display', async () => {
  //     const columns = [
  //       {
  //         title: 'Colum 1',
  //         cells: ['Info 1'],
  //       },
  //       {
  //         title: 'Colum 2',
  //         cells: ['Info 2'],
  //       },
  //     ]

  //     render(<Table columns={columns} emptyMessage='no info to show' id='sample-id' />)
  //     const table = screen.getByRole('table')

  //     const colums = screen.getAllByRole('columnheader')
  //     expect(colums.length).toBe(2)

  //     expect(table).toBeInTheDocument()
  //   })

  // test('test', async ({ page }) => {
  //   await page.goto('http://localhost:3000/');
  //   await page.getByTestId('testSearchForm').getByRole('button').nth(1).click();
  //   await page.getByRole('button', { name: 'All' }).click();
  //   await page.getByPlaceholder('Search for Block / Account ...').click();
  //   await page.getByRole('button', { name: 'All' }).click();
  //   await page.getByTestId('testSearchForm').getByText('Block').click();
  //   await page.getByTestId('testSearchForm').getByRole('button', { name: 'Block' }).click();
  //   await page.getByTestId('testSearchForm').getByText('Extrinsic').click();
  //   await page.getByRole('button', { name: 'Extrinsic' }).click();
  //   await page.getByText('Account').click();
  //   await page.getByRole('button', { name: 'Account' }).click();
  //   await page.getByRole('option', { name: 'Event' }).click();
  // });
})
