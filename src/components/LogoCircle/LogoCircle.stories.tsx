import type { Meta, StoryObj } from '@storybook/react';
import LogoCircle from './LogoCircle';

const meta = {
    title: 'Components/LogoCircle',
    component: LogoCircle,
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
  } satisfies Meta<typeof LogoCircle>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Default: Story = {
    parameters: {
      docs: {
        description: {
          story: 'Responsive logo circle positioned at bottom-right, with locked size and position at large screens.',
        },
      },
    },
  };