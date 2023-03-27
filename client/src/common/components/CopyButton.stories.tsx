import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CopyButton from './CopyButton'

export default {
  title: 'Common/CopyButton',
  component: CopyButton,
} as ComponentMeta<typeof CopyButton>

const Template: ComponentStory<typeof CopyButton> = (args) => <CopyButton {...args} />

export const Primary = Template.bind({})
Primary.args = {
  value: 'Value to copy',
}
