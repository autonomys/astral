import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Dropdown } from './Dropdown'

export default {
  title: 'Common/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />

export const Primary = Template.bind({})
Primary.args = {}
