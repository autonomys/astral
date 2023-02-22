import { render } from '@testing-library/react'

// common - Tabs
import { Tabs, Tab } from 'common/components'

describe('Tabs', () => {
  it('renders properly', async () => {
    const { asFragment } = render(
      <Tabs>
        <Tab title='Tab title'>Sample content</Tab>
      </Tabs>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
