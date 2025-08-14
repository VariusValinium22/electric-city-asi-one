import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      defaultValue: "",
    },
    legend: {
      control: "text",
      defaultValue: "",
    },
    variant: {
      control: "select",
      defaultValue: "default",
      options: ["default", "compact", "large"],
    },
    className: {
      control: "text",
      defaultValue: "",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const firstHeaderPage: Story = {
//     args: {
//         variant: "custom",
//         title: 'Make a Shark!',
//         legend:""
//     }
// }

export const ChooseSizeHeaderPage: Story = {
  args: {
    title: "Choose a size",
    legend: "Step 1/3",
    variant: "default",
    className: "",
  },
};

export const SmallSizeHeaderPage: Story = {
  args: {
    title: "Size: Small",
    legend: "Step 1/3",
  },
};

export const LargeSizeHeaderPage: Story = {
  args: {
    title: "Size: Large",
    legend: "Step 1/3",
  },
};

export const HabitatHeaderPage: Story = {
  args: {
    title: "Choose a habitat",
    legend: "Step 2/3",
  },
};

export const BottomHabitatHeaderPage: Story = {
  args: {
    title: "Habitat: Bottom dwelling",
    legend: "Step 2/3",
  },
};

export const OpenHabitatHeaderPage: Story = {
  args: {
    title: "Habitat: Open water",
    legend: "Step 2/3",
  },
};

export const WaterTemperatureHeaderPage: Story = {
  args: {
    title: "Choose water temperature",
    legend: "Step 3/3",
  },
};

export const ColdWaterTemperatureHeaderPage: Story = {
  args: {
    title: "Water temperature: Cold",
    legend: "Step 3/3",
  },
};

export const WarmWaterTemperatureHeaderPage: Story = {
  args: {
    title: "Water temperature: Warm",
    legend: "Step 3/3",
  },
};

export const SharkSkinHeaderPage: Story = {
  args: {
    title: "Choose the shark’s skin!",
    legend: "Last detail",
  },
};

export const SharkCreationHeaderPage: Story = {
  args: {
    title: "Atlantic sharpnose shark",
    legend: "Your Shark",
  },
};

export const AtlanticSharkCreationHeaderPage: Story = {
  args: {
    title: "Atlantic sharpnose shark",
    legend: "Your Shark",
  },
};

export const CoralSharkCreationHeaderPage: Story = {
  args: {
    title: "Coral catshark",
    legend: "Your Shark",
  },
};

export const EpauletteSharkCreationHeaderPage: Story = {
  args: {
    title: "Epaulette shark",
    legend: "Your Shark",
  },
};

export const SpinySharkCreationHeaderPage: Story = {
  args: {
    title: "Spiny dogfish",
    legend: "Your Shark",
  },
};

export const ChainSharkCreationHeaderPage: Story = {
  args: {
    title: "Chain catshark",
    legend: "Your Shark",
  },
};

export const BonnnetheadSharkCreationHeaderPage: Story = {
  args: {
    title: "Bonnnethead shark",
    legend: "Your Shark",
  },
};

export const SchoolSharkCreationHeaderPage: Story = {
  args: {
    title: "School shark",
    legend: "Your Shark",
  },
};

export const NurseSharkCreationHeaderPage: Story = {
  args: {
    title: "Nurse shark",
    legend: "Your Shark",
  },
};

export const WobbegongSharkCreationHeaderPage: Story = {
  args: {
    title: "Spotted Wobbegong",
    legend: "Your Shark",
  },
};

export const GreelandSharkCreationHeaderPage: Story = {
  args: {
    title: "Greenland shark",
    legend: "Your Shark",
  },
};

export const ScallopedSharkCreationHeaderPage: Story = {
  args: {
    title: "Scalloped Hammerhead Shark",
    legend: "Your Shark",
  },
};

export const WhaleSharkCreationHeaderPage: Story = {
  args: {
    title: "Whale Shark",
    legend: "Your Shark",
  },
};

export const PorgeableSharkCreationHeaderPage: Story = {
  args: {
    title: "Porbeagle Shark",
    legend: "Your Shark",
  },
};

export const SalmonSharkCreationHeaderPage: Story = {
  args: {
    title: "Salmon shark",
    legend: "Your Shark",
  },
};
