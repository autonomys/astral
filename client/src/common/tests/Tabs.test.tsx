import { render, screen } from '@testing-library/react'

// common - Tabs
import { Tabs, Tab } from 'common/components'

describe('Tabs', () => {
  it('renders properly', async () => {
    render(
      <Tabs>
        <Tab title='Tab title'>Sample content</Tab>
      </Tabs>,
    )
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
