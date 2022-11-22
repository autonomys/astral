import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StyledListItem, List, ListItem } from './List';

export default {
  title: 'Common/List',
  component: StyledListItem,
} as ComponentMeta<typeof StyledListItem>;

const Template: ComponentStory<typeof StyledListItem> = (args) => (
  <List>
    <ListItem {...args} />
    <StyledListItem {...args} />
  </List>
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Sample list',
  children: 'sample body',
};
