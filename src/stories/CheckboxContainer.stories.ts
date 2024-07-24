import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/CheckboxContainer',
  component: CheckboxContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Checkbox Container',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOptions: [],
    setSelectedOptions: (prev: string[]) => prev,
  },
} satisfies Meta<typeof CheckboxContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Checkbox Container',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOptions: [],
    setSelectedOptions(prev: string[]) {
      return prev;
    },
  },
};
