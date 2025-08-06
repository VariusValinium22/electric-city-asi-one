import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { GridCard } from "./GridCard";

// Default export with metadata
export default {
  title: "Components/GridCard",
  component: GridCard,
} as Meta<typeof GridCard>;

// Template with proper typing
const Template: StoryFn<typeof GridCard> = (args) => <GridCard {...args} />;

export const SmallCard = Template.bind({});
SmallCard.args = {
  size: "small",
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  size: "large",
};
