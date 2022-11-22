import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spinner from './Spinner';

export default {
  title: 'Common/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
