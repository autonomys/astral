import { render, screen } from '@testing-library/react'

// common - table
import { Table } from 'common/components'

describe('Common table', () => {
  it('test empty state', async () => {
    render(<Table columns={[]} emptyMessage='no info to show' id='sample-id' />)
    const element = await screen.findByText(/no info to show/i)

    expect(element).toBeInTheDocument()
  })

  it('test table display', async () => {
    const columns = [
      {
        title: 'Colum 1',
        cells: ['Info 1'],
      },
      {
        title: 'Colum 2',
        cells: ['Info 2'],
      },
    ]

    const { asFragment } = render(
      <Table columns={columns} emptyMessage='no info to show' id='sample-id' />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
