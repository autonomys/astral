import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import StatItem from "./StatItem";

export default {
  title: "Common/StatItem",
  component: StatItem,
} as ComponentMeta<typeof StatItem>;

const Template: ComponentStory<typeof StatItem> = (args) => (
  <StatItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "sample",
  value: "200",
};
