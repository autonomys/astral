import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorFallback from '.';

export default {
  title: 'Common/ErrorFallback',
  component: ErrorFallback,
} as ComponentMeta<typeof ErrorFallback>;

const Template: ComponentStory<typeof ErrorFallback> = () => (
  <ErrorFallback />
);

export const Primary = Template.bind({});
Primary.args = {};
