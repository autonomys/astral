import { render } from '@testing-library/react'

// common - statItem
import { StatItem } from 'common/components'

describe('statItem', () => {
  it('renders properly', async () => {
    const { asFragment } = render(<StatItem title='sample title' value='value' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
