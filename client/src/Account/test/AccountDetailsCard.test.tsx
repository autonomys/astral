import { render, screen } from '@testing-library/react'

// common
import { ChainProvider } from 'common/providers/ChainProvider'

// account
import { AccountDetailsCard } from 'Account/components'

const mockUseDomains = () => ({
  selectedChain: {
    urls: {
      page: 'gemini-3c',
    },
    isDomain: false,
  },
  setSelectedChain: jest.fn(),
})

describe('Account details card', () => {
  beforeEach(() => {
    jest.mock('common/hooks/useDomains', () => mockUseDomains)
  })

  it('renders without error', async () => {
    const account = {
      extrinsics: [],
      free: 0,
      id: 'stA7utHHfvdmxo9s9smXVzpyMHQzzstS9b86UzJja91SLqvsQ',
      reserved: 0,
      total: 0,
      updatedAt: 1008639,
      nonce: 1008639,
      rewards: [],
    }

    render(
      <ChainProvider>
        <AccountDetailsCard account={account} accountAddress={account.id} />
      </ChainProvider>,
    )

    const listItems = screen.getAllByRole('listitem')

    expect(listItems[0]).toHaveTextContent(/Public key/i)
    expect(listItems[1]).toHaveTextContent(/1008639/i)
  })
})
