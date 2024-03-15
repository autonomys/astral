import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { SearchBar } from './SearchBar'

export default {
  title: 'Common/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />

export const Primary = Template.bind({})
Primary.args = {}
