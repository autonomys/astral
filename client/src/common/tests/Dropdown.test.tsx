import { render } from '@testing-library/react'

// common - Dropdown
import { Dropdown } from 'common/components'

describe('Dropdown', () => {
  it('renders properly', async () => {
    const { asFragment } = render(<Dropdown />)

    expect(asFragment()).toMatchSnapshot()
  })
})
