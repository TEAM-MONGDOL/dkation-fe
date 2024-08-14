import { z } from 'zod';
import { WktStatusType } from './adminType';

export type AxiosErrorResponse = {
  status: number;
  message: string;
  timestamp: string;
};

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

export const KakaoMetaSchema = z.object({
  total_count: z.number(),
  pageable_count: z.number(),
  is_end: z.boolean(),
});

export const KakaoDocumentSchema = z.object({
  address: z.object({
    address_name: z.string(),
    region_1depth_name: z.string(),
    region_2depth_name: z.string(),
    region_3depth_name: z.string(),
    region_3depth_h_name: z.string(),
    h_code: z.string(),
    b_code: z.string(),
    mountain_yn: z.string(),
    main_address_no: z.string(),
    sub_address_no: z.string(),
    x: z.string(),
    y: z.string(),
  }),
  address_name: z.string(),
  address_type: z.string(),
  road_address: z.object({
    address_name: z.string(),
    building_name: z.string(),
    main_building_no: z.string(),
    region_1depth_name: z.string(),
    region_2depth_name: z.string(),
    region_3depth_name: z.string(),
    road_name: z.string(),
    sub_building_no: z.string(),
    underground_yn: z.string(),
    x: z.string(),
    y: z.string(),
    zone_no: z.string(),
  }),
  x: z.string(),
  y: z.string(),
});

export const KakaoPlaceSchema = z.object({
  documents: z.array(KakaoDocumentSchema),
  meta: KakaoMetaSchema,
});
