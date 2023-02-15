import { render, screen } from '@testing-library/react'

// common - list
import { List, ListItem } from 'common/components'

describe('List', () => {
  it('renders properly', async () => {
    render(
      <List>
        <ListItem>Sample item</ListItem>
      </List>,
    )
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
