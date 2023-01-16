import { render, screen } from '@testing-library/react'

// account
import { AccountDetailsTabs } from 'Account/components'

it('renders without error', async () => {
  const extrinsics = []

  render(<AccountDetailsTabs extrinsics={extrinsics} />)

  expect(await screen.findByText(/extrinsics/i)).toBeInTheDocument()
})
