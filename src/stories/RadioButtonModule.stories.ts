import RadioButtonModule from '@/_components/common/modules/RadioButtonModule';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RadioButtonModule> = {
  title: 'Common/RadioButtonModule',
  component: RadioButtonModule,
  parameters: {
    layout: 'centered',
  },
  args: {
    option: 'Option',
    isClicked: false,
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    option: 'Option',
    isClicked: false,
    onClick: () => {
      console.log('Clicked!');
    },
  },
};
