import { render } from '@testing-library/react'

// common - errorFallback
import { ErrorFallback } from 'common/components'

describe('errorFallback', () => {
  it('renders properly', async () => {
    const { asFragment } = render(
      <ErrorFallback resetErrorBoundary={() => window.location.reload()} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
