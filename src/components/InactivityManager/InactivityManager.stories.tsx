import { Meta, StoryObj } from "@storybook/react";
import InactivityManager from "./InactivityManager";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof InactivityManager> = {
  title: "Components/InactivityManager",
  component: InactivityManager,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/test"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    promptState: 1,
    resetInactivity: () => alert("Reset inactivity called"),
  },
};
export default meta;

type Story = StoryObj<typeof InactivityManager>;

export const Default: Story = {
  args: {
    promptState: 1, // Modal visible
  },
};

export const TimeoutState: Story = {
  args: {
    promptState: 2, // Timed out state
  },
};

export const InactiveState: Story = {
  args: {
    promptState: 0, // No modal
  },
};
