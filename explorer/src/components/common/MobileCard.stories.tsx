import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { MobileCard } from './MobileCard'

export default {
  title: 'Common/MobileCard',
  component: MobileCard,
} as ComponentMeta<typeof MobileCard>

const Template: ComponentStory<typeof MobileCard> = (args) => <MobileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  header: 'Header',
  body: [{ name: 'sample name', value: 'sample value' }],
  id: 'sample id',
}
