import { WktStatusType } from './adminType';

export type DatePickerTagType =
  | 'ALL'
  | '1_WEEK'
  | '1_MONTH'
  | '3_MONTH'
  | '6_MONTH'
  | '1_YEAR';

export const datePickerTagList: DatePickerTagType[] = [
  'ALL',
  '1_WEEK',
  '1_MONTH',
  '3_MONTH',
  '6_MONTH',
  '1_YEAR',
];

export const datePickerTagConverter: { [key in DatePickerTagType]: string } = {
  ALL: '전체',
  '1_WEEK': '1주일',
  '1_MONTH': '1개월',
  '3_MONTH': '3개월',
  '6_MONTH': '6개월',
  '1_YEAR': '1년',
};

export const WktStatusList: WktStatusType[] = ['PLANNED', 'ONGOING', 'CLOSED'];

export const WktStatusConverter: { [key in WktStatusType]: string } = {
  PLANNED: '모집 예정',
  ONGOING: '모집 중',
  CLOSED: '모집 완료',
};
