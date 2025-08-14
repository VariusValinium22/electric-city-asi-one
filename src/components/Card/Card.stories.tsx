import React from "react";
import Card, { CardProps } from "./Card";
import type { Meta, StoryFn } from "@storybook/react";
import "../../global/default.css";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" },
    imageUrl: { control: "text" },
  },
};

export default meta;

// Template function accepts args props

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

// Version of template with default values

Default.args = {
  title: "Shark A (Small Shark)",
  description: "6 inches -- 7 feet",
  disabled: false,
  imageUrl: "/images/hammerhead.jpg",
};
