import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ErrorFallback from "./ErrorFallback";

export default {
  title: "Common/ErrorFallback",
  component: ErrorFallback,
} as ComponentMeta<typeof ErrorFallback>;

const Template: ComponentStory<typeof ErrorFallback> = (args) => (
  <ErrorFallback {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
