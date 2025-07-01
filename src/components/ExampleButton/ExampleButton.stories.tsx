import type { Meta, StoryObj } from '@storybook/react';
import { ExampleButton } from './ExampleButton';

const meta = {
  title: 'Components/ExampleButton',
  component: ExampleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Click me',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Click me',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Cannot click',
    disabled: true,
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Custom Text',
    variant: 'primary',
  },
};
