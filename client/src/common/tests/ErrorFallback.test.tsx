import { render, screen } from '@testing-library/react'

// common - errorFallback
import { ErrorFallback } from 'common/components'

describe('errorFallback', () => {
  it('renders properly', async () => {
    render(<ErrorFallback />)
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
