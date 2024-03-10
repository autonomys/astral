import { render } from '@testing-library/react'

// common - statusIcon
import { StatusIcon } from 'common/components'

describe('statusIcon', () => {
  it('renders check icon', async () => {
    const { asFragment } = render(<StatusIcon status={true} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders clock icon', async () => {
    const { asFragment } = render(<StatusIcon status={false} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
