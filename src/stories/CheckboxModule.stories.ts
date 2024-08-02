import CheckboxModule from '@/_components/common/modules/CheckboxModule';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Common/CheckboxModule',
  component: CheckboxModule,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    option: {
      control: 'text',
    },
    isChecked: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    option: 'Checkbox Module',
    isChecked: false,
    onClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    option: 'Checkbox Module',
    isChecked: false,
    onClick: () => {},
  },
};
