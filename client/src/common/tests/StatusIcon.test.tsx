import { render, screen } from '@testing-library/react'

// common - statusIcon
import { StatusIcon } from 'common/components'

describe('statusIcon', () => {
  it('renders properly', async () => {
    render(<StatusIcon status={true} />)
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
