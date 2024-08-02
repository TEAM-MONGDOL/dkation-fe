import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/AccordionHeaderModule',
  component: AccordionHeaderModule,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    isExpanded: { control: 'boolean' },
    setIsExpanded: { action: 'setIsExpanded' },
  },
  args: {
    title: 'Accordion HeaderModule Module',
    isExpanded: false,
  },
} satisfies Meta<typeof AccordionHeaderModule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion HeaderModule Module',
    isExpanded: false,
    setIsExpanded(prev) {
      return !prev;
    },
  },
};
