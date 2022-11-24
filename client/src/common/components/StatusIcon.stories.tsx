import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import StatusIcon from './StatusIcon'

export default {
  title: 'Common/StatItem',
  component: StatusIcon,
} as ComponentMeta<typeof StatusIcon>

const Template: ComponentStory<typeof StatusIcon> = (args) => <StatusIcon {...args} />

export const Primary = Template.bind({})
Primary.args = {
  status: true,
}
