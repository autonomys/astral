import { render, screen } from '@testing-library/react'

// common - table
import { Spinner } from 'common/components'

describe('Search bar', () => {
  it('renders properly', async () => {
    render(<Spinner />)
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
