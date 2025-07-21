import type { Meta, StoryObj } from "@storybook/react";
import { TextButton } from "./TextButton";

const meta: Meta<typeof TextButton> = {
  title: "Components/TextButton",
  component: TextButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
    argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["a", "b"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;


type Story = StoryObj<typeof meta>;

export const A_Button: Story = {
  args: {
    label: "A",
    id: "a-button",
    variant: "a",
    disabled: false,
  },
};

export const B_Button: Story = {
  args: {
    label: "B",
    id: "b-button",
    variant: "b",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "A",
    variant: "a",
    disabled: true,
  },
};

