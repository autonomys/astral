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

    render(<Table columns={columns} emptyMessage='no info to show' id='sample-id' />)
    const table = screen.getByRole('table')

    const colums = screen.getAllByRole('columnheader')
    expect(colums.length).toBe(2)

    expect(table).toBeInTheDocument()
  })
})
