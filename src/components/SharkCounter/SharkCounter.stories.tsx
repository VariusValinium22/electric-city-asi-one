// src/components/SharkCounter/SharkCounter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import SharkCounter from './SharkCounter';

const meta: Meta<typeof SharkCounter> = {
  title: 'Components/SharkCounter',
  component: SharkCounter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SharkCounter>;

export const Default: Story = {
  args: {}, 
};
