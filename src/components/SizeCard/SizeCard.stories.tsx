import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SizeCard } from "./SizeCard";

// Default export with metadata
export default {
  title: "Components/GridCard",
  component: SizeCard,
} as Meta<typeof SizeCard>;

// Template with proper typing
const Template: StoryFn<typeof SizeCard> = (args) => <SizeCard {...args} />;

export const SmallCard = Template.bind({});
SmallCard.args = {
  size: "small",
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  size: "large",
};
