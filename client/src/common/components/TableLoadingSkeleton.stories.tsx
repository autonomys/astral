import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TableLoadingSkeleton from './TableLoadingSkeleton'

export default {
  title: 'Common/TableLoadingSkeleton',
  component: TableLoadingSkeleton,
} as ComponentMeta<typeof TableLoadingSkeleton>

const Template: ComponentStory<typeof TableLoadingSkeleton> = (args) => (
  <TableLoadingSkeleton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
