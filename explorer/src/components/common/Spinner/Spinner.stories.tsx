import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Spinner } from '.'

export default {
  title: 'Common/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />

export const Primary = Template.bind({})
Primary.args = {}
