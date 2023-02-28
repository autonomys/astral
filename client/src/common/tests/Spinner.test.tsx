import { render } from '@testing-library/react'

// common - table
import { Spinner } from 'common/components'

describe('Spinner component', () => {
  it('renders properly', async () => {
    const { asFragment } = render(<Spinner />)

    expect(asFragment()).toMatchSnapshot()
  })
})
