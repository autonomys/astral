import { render } from '@testing-library/react'

// common - copyButton
import { CopyButton } from 'common/components'

describe('copyButton', () => {
  it('renders properly', async () => {
    const { asFragment } = render(<CopyButton value='Value to by copied' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
