import RadioButtonsContainer from '@/_components/common/containers/RadioButtonsContainer';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadioButtonsContainer> = {
  title: 'RadioButtonsContainer',
  component: RadioButtonsContainer,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Title',
    currentChecked: 'Option 1',
    setCurrentChecked: (item: string) => {
      console.log('Clicked!', item);
    },
    optionList: ['Option 1', 'Option 2', 'Option 3'],
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    currentChecked: 'Option 1',
    setCurrentChecked: (item: string) => {
      console.log('Clicked!', item);
    },
    optionList: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const WithLongTitle: Story = {
  args: {
    title: 'This is a long title',
    currentChecked: 'Option 1',
    setCurrentChecked: (item: string) => {
      console.log('Clicked!', item);
    },
    optionList: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const WithLongOptions: Story = {
  args: {
    title: 'Title',
    currentChecked: 'This is a long option 1',
    setCurrentChecked: (item: string) => {
      console.log('Clicked!', item);
    },
    optionList: [
      'This is a long option 1',
      'This is a long option 2',
      'This is a long option 3',
    ],
  },
};
