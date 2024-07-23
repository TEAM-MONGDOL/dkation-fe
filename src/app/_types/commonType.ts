export type DatePickerTagType =
  | 'ALL'
  | '1_WEEK'
  | '1_MONTH'
  | '3_MONTH'
  | '6_MONTH'
  | 'YEAR';

export const datePickerTagList: { [key in DatePickerTagType]: string } = {
  ALL: '전체',
  '1_WEEK': '1주일',
  '1_MONTH': '1개월',
  '3_MONTH': '3개월',
  '6_MONTH': '6개월',
  YEAR: '1년',
};
