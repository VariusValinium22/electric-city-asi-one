import type { Meta, StoryObj } from '@storybook/react';
import VideoBackground from './VideoBackground';

const meta = {
  title: 'Components/VideoBackground',
  component: VideoBackground,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VideoBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
      docs: {
        description: {
          story: 'A fullscreen video background that autoplays, loops, and is muted for web compatibility.',
        },
      },
    },
  };
