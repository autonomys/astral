import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tabs from "./Tabs";

export default {
  title: "Common/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: "sample-tab",
  tabs: [
    { title: "tab 1", content: "sample body" },
    { title: "tab 2", content: "sample body 2" },
  ],
};
