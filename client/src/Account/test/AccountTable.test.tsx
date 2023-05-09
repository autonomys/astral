import { render, screen, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// account
import { AccountTable } from 'Account/components'
import { ChainProvider } from 'common/providers/ChainProvider'

const mockUseDomains = () => ({
  selectedChain: {
    urls: {
      page: 'gemini-3c',
    },
  },
  setSelectedChain: jest.fn(),
})

describe('Account table', () => {
  beforeEach(() => {
    jest.mock('common/hooks/useDomains', () => mockUseDomains)
  })

  it('test empty state', async () => {
    render(
      <ChainProvider>
        <AccountTable page={1} accounts={[]} />
      </ChainProvider>,
    )
    const element = await screen.findByText(/there are no accounts to show/i)
    expect(element).toBeInTheDocument()
  })
  it('test table display', async () => {
    const accounts = [
      {
        extrinsics: [],
        free: 0,
        id: 'stA7utHHfvdmxo9s9smXVzpyMHQzzstS9b86UzJja91SLqvsQ',
        reserved: 0,
        total: 0,
        updatedAt: 1008639,
        rewards: [],
      },
    ]
    render(
      <ChainProvider>
        <AccountTable page={1} accounts={accounts} />
      </ChainProvider>,
      { wrapper: BrowserRouter },
    )
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    accounts.forEach(({ id }) => {
      const row = screen.getByText(id).closest('tr')
      if (row) {
        // highlight-start
        const utils = within(row)
        expect(utils.getByText(id)).toBeInTheDocument()
        // highlight-end
      }
    })
  })
})
