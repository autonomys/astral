import { render, screen } from '@testing-library/react'

// common - mobileCard
import { MobileCard } from 'common/components'

describe('mobileCard', () => {
  const row = [{ name: 'sample', value: 1 }]
  it('renders properly', async () => {
    render(<MobileCard header='sample header' body={row} id='sample-id' />)
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
