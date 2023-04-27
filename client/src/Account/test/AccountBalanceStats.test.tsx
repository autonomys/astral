import { render, screen } from '@testing-library/react'

// account
import { AccountBalanceStats } from 'Account/components'

describe('Account balance stats', () => {
  it('renders without error', async () => {
    const account = {
      extrinsics: [],
      free: 0,
      id: 'stA7utHHfvdmxo9s9smXVzpyMHQzzstS9b86UzJja91SLqvsQ',
      reserved: 0,
      total: 0,
      updatedAt: 1008639,
      rewards: []
    }

    render(<AccountBalanceStats account={account} />)

    expect(await screen.findByText(/transferable/i)).toBeInTheDocument()
  })
})
