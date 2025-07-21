import type { Meta, StoryObj } from "@storybook/react";
import SharkCounter from "./SharkCounter";
import { StoreProvider } from "../../store";

const meta: Meta<typeof SharkCounter> = {
  title: "Components/SharkCounter",
  component: SharkCounter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SharkCounter>;

export const IncrementTest: Story = {
  args: {},
  render: () => {
    localStorage.setItem("created-shark-count", "0");
    return (
      <StoreProvider>
        <SharkCounter />
      </StoreProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "SharkCounter starts at 0 and auto-increments by 1 after 2 user ticks(2500ms each) using store logic.",
      },
    },
  },
};
