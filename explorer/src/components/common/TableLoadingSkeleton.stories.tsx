import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { TableLoadingSkeleton } from './TableLoadingSkeleton'

export default {
  title: 'Common/TableLoadingSkeleton',
  component: TableLoadingSkeleton,
} as ComponentMeta<typeof TableLoadingSkeleton>

const Template: ComponentStory<typeof TableLoadingSkeleton> = (args) => (
  <TableLoadingSkeleton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
