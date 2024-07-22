import RadioButtonAtom from '@/_components/common/atoms/RadioButtonAtom';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadioButtonAtom> = {
  title: 'Common/RadioButtonAtom',
  component: RadioButtonAtom,
  parameters: {
    layout: 'centered',
  },
  args: {
    isChecked: false,
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isChecked: false,
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    isChecked: false,
  },
};
