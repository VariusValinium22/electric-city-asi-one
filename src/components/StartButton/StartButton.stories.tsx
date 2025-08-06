import type { Meta, StoryObj } from "@storybook/react";
import StartButton from "./StartButton";

const meta: Meta<typeof StartButton> = {
  title: "Components/StartButton",
  component: StartButton,
  parameters: {
    layout: "centered",
  },
  globals: {
  backgrounds: { value: "dark" },
},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
        <div style={{ position: "relative", height: "400px", background: "#001b2e" }} >
            <Story />
        </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
