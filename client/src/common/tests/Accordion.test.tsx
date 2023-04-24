import { render, screen } from '@testing-library/react'

// common - Accordion
import { Accordion } from 'common/components'

describe('Accordion', () => {
  it('renders properly', async () => {
    render(
      <Accordion title='My accordion'>
        <div>Accordion Content</div>
      </Accordion>,
    )
    const element = await screen.findByText('My accordion')

    expect(element).toBeInTheDocument()
  })

  it('should show body', async () => {
    render(
      <Accordion title='My accordion'>
        <div>Accordion Content</div>
      </Accordion>,
    )
    const element = await screen.findByText('Accordion Content')

    expect(element).toBeInTheDocument()
  })
})
