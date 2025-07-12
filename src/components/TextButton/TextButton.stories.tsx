import type { Meta, StoryObj } from "@storybook/react";
import { TextButton } from "./TextButton";

const meta = {
  title: "Components/TextButton",
  component: TextButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const A_Button: Story = {
  args: {
    label: "A",
    id: "a-button",
  },
};

export const B_Button: Story = {
  args: {
    label: "B",
    id: "b-button",
  },
};

