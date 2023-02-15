import { render, screen } from '@testing-library/react'

// common - pagination
import { Pagination } from 'common/components'

describe('pagination', () => {
  it('renders properly', async () => {
    render(
      <Pagination
        totalCount={100}
        pageSize={10}
        currentPage={1}
        nextPage={() => 2}
        hasPreviousPage={false}
        hasNextPage={true}
        previousPage={() => 0}
        handleGetPage={() => 0}
      />,
    )
    // const element = await screen.findByText('Oops something went wrong')

    // expect(element).toBeInTheDocument()
  })
})
