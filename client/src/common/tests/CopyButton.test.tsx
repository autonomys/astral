import { render, screen } from '@testing-library/react'

// common - copyButton
import { CopyButton } from 'common/components'

describe('copyButton', () => {
  it('renders properly', async () => {
    render(<CopyButton value='Value to by copied' />)
    // const element = await screen.findByText('My accordion')

    // expect(element).toBeInTheDocument()
  })
})
