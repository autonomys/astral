import { render, screen } from '@testing-library/react'

// common - Dropdown
import { Dropdown } from 'common/components'

describe('Dropdown', () => {
  it('renders properly', async () => {
    render(<Dropdown />)
    // const element = await screen.findByText('My accordion')

    // expect(element).toBeInTheDocument()
  })
})
