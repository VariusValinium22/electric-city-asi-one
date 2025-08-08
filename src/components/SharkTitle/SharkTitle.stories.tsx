import type { Meta, StoryObj } from '@storybook/react';
import SharkTitle from './SharkTitle';

const meta = {
  title: 'Components/SharkTitle',
  component: SharkTitle,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative w-full h-screen bg-blue-500">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SharkTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Create a Shark!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large responsive title with white stroke outline and blue fill, optimized for all screen sizes.',
      },
    },
  },
};