import { render, screen } from '@testing-library/react'

// common - statItem
import { StatItem } from 'common/components'

describe('statItem', () => {
  it('renders properly', async () => {
    render(<StatItem title='sample title' value='value' />)
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
