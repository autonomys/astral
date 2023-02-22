import { render } from '@testing-library/react'

// common - mobileCard
import { MobileCard } from 'common/components'

describe('mobileCard', () => {
  const row = [{ name: 'sample', value: 1 }]
  it('renders properly', async () => {
    const { asFragment } = render(<MobileCard header='sample header' body={row} id='sample-id' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
