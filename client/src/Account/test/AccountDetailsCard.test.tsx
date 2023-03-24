import { render, screen } from '@testing-library/react'

// account
import { AccountDetailsCard } from 'Account/components'

describe('first', () => {
  it('renders without error', async () => {
    const account = {
      extrinsics: [],
      free: 0,
      id: 'stA7utHHfvdmxo9s9smXVzpyMHQzzstS9b86UzJja91SLqvsQ',
      reserved: 0,
      total: 0,
      updatedAt: 1008639,
    }

    render(<AccountDetailsCard account={account} accountAddress={account.id} />)

    const listItems = screen.getAllByRole('listitem')

    expect(listItems[0]).toHaveTextContent(/stA7ut...qvsQ/i)
    expect(listItems[1]).toHaveTextContent(/-/i)
    expect(listItems[2]).toHaveTextContent(/1008639/i)
  })
})
