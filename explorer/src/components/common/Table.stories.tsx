import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Table } from './Table'

export default {
  title: 'Common/Table',
  component: Table,
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Primary = Template.bind({})
Primary.args = {
  id: 'sample-id',
  columns: [
    { title: 'Column 1', cells: ['Row 1', 'Row 2'] },
    { title: 'Column 2', cells: ['Row 1', 'Row 2'] },
  ],
  emptyMessage: 'Empty message',
}

export const Empty = Template.bind({})
Empty.args = {
  id: 'sample-id',
  columns: [],
  emptyMessage: 'Empty message',
}
