import { ComponentStory, ComponentMeta } from '@storybook/react'

import ErrorFallback from '.'

export default {
  title: 'Common/ErrorFallback',
  component: ErrorFallback,
} as ComponentMeta<typeof ErrorFallback>

const Template: ComponentStory<typeof ErrorFallback> = () => (
  <ErrorFallback resetErrorBoundary={() => null} />
)

export const Primary = Template.bind({})
Primary.args = {}
