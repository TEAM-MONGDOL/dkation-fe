import RadioButtonsContainer from '@/_components/common/containers/RadioButtonsContainer';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadioButtonsContainer> = {
  title: 'Common/RadioButtonsContainer',
  component: RadioButtonsContainer,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Title',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOption: 'Option 1',
    setSelectedOption: (item: string) => {
      console.log('Clicked!', item);
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOption: 'Option 1',
    setSelectedOption: (item: string) => {
      console.log('Clicked!', item);
    },
  },
};
