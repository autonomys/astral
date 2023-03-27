import { render } from '@testing-library/react'

// common - list
import { List, ListItem } from 'common/components'

describe('List', () => {
  it('renders properly', async () => {
    const { asFragment } = render(
      <List>
        <ListItem>Sample item</ListItem>
      </List>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
