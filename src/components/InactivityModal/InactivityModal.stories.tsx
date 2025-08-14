import { Meta, StoryObj } from "@storybook/react";
import InactivityModal from "./InactivityModal";

const meta: Meta<typeof InactivityModal> = {
  title: "Components/InactivityModal",
  component: InactivityModal,
  args: {
    isVisible: true,
    secondsLeft: 30,
    onContinue: () => alert("Continue pressed"),
  },
};
export default meta;

type Story = StoryObj<typeof InactivityModal>;

export const Default: Story = {};
export const TenSecondsLeft: Story = {
  args: {
    secondsLeft: 10,
  },
};
