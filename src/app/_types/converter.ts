import dayjs from 'dayjs';

export const dateConverter = (date: string) => {
  return dayjs(date).format('YYYY.MM.DD');
};
