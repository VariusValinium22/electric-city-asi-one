import type { Meta, StoryObj } from "@storybook/react";
import { Outcome } from "./Outcome";

const newViewports = {
  default: {
    name: "Default",
    styles: {
      width: "1920px",
      height: "1080px",
    },
  },
};

const meta = {
  title: "Components/Outcome",
  component: Outcome,
  parameters: {
    layout: "fullscreen",
    viewport: {
      value: "Default",
      options: newViewports,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    headerText: {
      control: "text",
      defaultValue: "",
    },
    legendText: {
      control: "text",
      defaultValue: "",
    },
    descriptionText: {
      control: "text",
      defaultValue: "",
    },
    showBButton: {
      control: "boolean",
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Outcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerText: "Water temperature: Warm",
    legendText: "Step 3/3",
    descriptionText:
      "Some sharks spend the majority of their lives in warm waters in tropical and sub-tropical climates. Warmer waters typically have larger fish populations that sharks can feed on. These sharks balance reef ecosystems by feeding on sick or unhealthy fish.",
    showBButton: true,
  },
};
