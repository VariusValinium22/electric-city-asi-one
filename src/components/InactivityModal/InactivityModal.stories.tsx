import { Meta, StoryObj } from "@storybook/react";
import InactivityModal from "./InactivityModal";

const meta: Meta<typeof InactivityModal> = {
  title: "Components/InactivityModal",
  component: InactivityModal,
  tags: ["autodocs"],
  args: {
    secondsLeft: 30,
  },
};

export default meta;
type Story = StoryObj<typeof InactivityModal>;

export const Default: Story = {};

export const Countdown10: Story = {
  args: {
    secondsLeft: 10,
  },
};

export const Countdown5: Story = {
  args: {
    secondsLeft: 5,
  },
};

export const Countdown1: Story = {
  args: {
    secondsLeft: 1,
  },
};