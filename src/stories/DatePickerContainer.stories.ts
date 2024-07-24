import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/DatePickerContainer',
  component: DatePickerContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedTag: { control: 'text' },
    setSelectedTag: { action: 'setSelectedTag' },
    startDate: { control: 'date' },
    setStartDate: { action: 'setStartDate' },
    endDate: { control: 'date' },
    setEndDate: { action: 'setEndDate' },
  },
  args: {
    selectedTag: null,
    startDate: null,
    endDate: null,
  },
} satisfies Meta<typeof DatePickerContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedTag: null,
    setSelectedTag(prev) {
      return prev;
    },
    startDate: null,
    setStartDate(prev) {
      return prev;
    },
    endDate: null,
    setEndDate(prev) {
      return prev;
    },
  },
};
