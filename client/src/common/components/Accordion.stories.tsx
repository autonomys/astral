import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Accordion from './Accordion';

export default {
  title: 'Common/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Accordion title',
  children: 'Accordion body',
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Accordion title',
  children: 'Accordion body',
  value: '213',
};
