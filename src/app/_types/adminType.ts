import App from 'next/app';
import { title } from 'process';
import { boolean, z } from 'zod';

// ResponseSchema
export const pageInfoSchema = z.object({
  pageNum: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export const wktInfoSchema = z.object({
  title: z.string(),
  thumbnail: z.string(),
  totalRecruit: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  applyStartDate: z.string(),
  applyEndDate: z.string(),
  createdAt: z.string(),
});

export const workationListSchema = z.object({
  wktInfos: wktInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const reviewListInfoSchema = z.object({
  id: z.number(),
  reviewer: z.string(),
  wktPlace: z.string(),
  rating: z.number(),
  lastModifiedAt: z.string(),
  blindedType: z.union([z.literal('TRUE'), z.literal('FALSE')]),
});

export const ReviewListInfoSchema = z.object({
  reviewList: reviewListInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const pointSupplyInfo = z.object({
  id: z.number(),
  pointSupplyType: z.union([z.literal('PERSONAL'), z.literal('GROUP')]),
  pointTitle: z.string(),
  name: z.string(),
  quantity: z.number(),
  supplyTime: z.string(),
});

export const pointSupplyListSchema = z.object({
  pointSupplyList: pointSupplyInfo.array(),
  pageInfo: pageInfoSchema,
});

export const pointInfoSchema = z.object({
  pointType: z.union([
    z.literal('MONTHLY'),
    z.literal('WELCOME'),
    z.literal('SPECIAL'),
    z.literal('WORKATION'),
  ]),
  getTime: z.string(),
  usedPoint: z.number(),
  totalPoint: z.number(),
});

export const pointInfoListSchema = z.object({
  pointInfos: pointInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const fileUrlSchema = z.string();

export const fileUrlsSchema = z.object({
  fileUrls: fileUrlSchema.array(),
});

export const announcementInfoSchema = z.object({
  id: z.number(),
  type: z.union([z.literal('NOTICE'), z.literal('RESULT'), z.literal('EVENT')]),
  title: z.string(),
  createdAt: z.string(),
});

export const announcementListSchema = z.object({
  announcementInfos: announcementInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const announcementDetailSchema = z.object({
  id: z.number(),
  type: z.union([z.literal('NOTICE'), z.literal('RESULT'), z.literal('EVENT')]),
  title: z.string(),
  content: z.string(),
  fileUrls: fileUrlSchema.array(),
});

export const applyStatusSchema = z.union([
  z.literal('APPLIED'),
  z.literal('RAFFLE_WAIT'),
  z.literal('NO_WINNING'),
  z.literal('CONFIRM_WAIT'),
  z.literal('CANCEL'),
  z.literal('CONFIRM'),
  z.literal('WAIT'),
  z.literal('VISITED'),
]);

export const applyInfoSchema = z.object({
  wktName: z.string(),
  applicationDate: z.string(),
  bettingPoint: z.number(),
  winningProbability: z.number(),
  status: applyStatusSchema,
});

export const applyListSchema = z.object({
  applyInfos: applyInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const memberInfoSchema = z.object({
  name: z.string(),
  accountId: z.string(),
  department: z.string(),
  pointQuantity: z.number(),
  pointApplicationQuantity: z.number(),
});

export const memberListSchema = z.object({
  memberInfos: memberInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const memberDetailSchema = z.object({
  name: z.string(),
  accountId: z.string(),
  department: z.string(),
  pointQuantity: z.number(),
});

// Type
export type StatusType = z.infer<typeof applyStatusSchema>;

export type OrderType = 'ASC' | 'DESC';

export type PointRewardType = 'PERSONAL' | 'GROUP';

export type NoticeType = 'NOTICE' | 'RESULT' | 'EVENT';

export type ResultType = 'NAME' | 'LOWEST' | 'HIGHEST';

export type TeamType =
  | 'MANAGEMENT'
  | 'SALES'
  | 'MARKETING'
  | 'PROMOTION'
  | 'DEV';
export type MembersOrderType = 'NAME' | 'HIGHEST' | 'LOWEST';

export type PointRequestStatusType = 'WAITING' | 'REJECTED' | 'ACCEPTED';

export type LocationType =
  | 'SEOUL'
  | 'GANGWON'
  | 'CHUNGCEOUNG'
  | 'JEONLA'
  | 'GYEONGSANG'
  | 'JEJU'
  | 'ABROAD';

export type PointOrderType = 'POINT_HIGHEST' | 'POINT_LOWEST';

export type PointChangeType = 'INCREASE' | 'DECREASE';

// Convert Type / List
export const statusList: { [key in StatusType]: string } = {
  APPLIED: '신청완료',
  RAFFLE_WAIT: '추첨대기',
  NO_WINNING: '미당첨',
  CONFIRM_WAIT: '확정대기',
  CANCEL: '당첨취소',
  CONFIRM: '당첨확정',
  WAIT: '대기',
  VISITED: '일정종료',
};

export const pointOrderList: { [key in PointOrderType]: string } = {
  POINT_HIGHEST: '배팅 포인트 높은 순',
  POINT_LOWEST: '배팅 포인트 낮은 순',
};

export const pointChangeList: { [key in PointChangeType]: string } = {
  INCREASE: '포인트 증가',
  DECREASE: '포인트 감소',
};

export const pointRequestStatusList: {
  [key in PointRequestStatusType]: string;
} = {
  WAITING: '대기',
  REJECTED: '반려',
  ACCEPTED: '승인',
};

export const membersOrderList: { [key in MembersOrderType]: string } = {
  NAME: '이름순',
  HIGHEST: '보유 포인트 높은순',
  LOWEST: '보유 포인트 낮은순',
};

export const teamList: { [key in TeamType]: string } = {
  MANAGEMENT: '경영팀',
  SALES: '영업팀',
  MARKETING: '마케팅팀',
  PROMOTION: '홍보팀',
  DEV: '개발팀',
};

export const orderList: { [key in OrderType]: string } = {
  ASC: '최신순',
  DESC: '오래된순',
};

export const pointRewardList: { [key in PointRewardType]: string } = {
  PERSONAL: '개인',
  GROUP: '단체',
};
export const noticeList: { [key in NoticeType]: string } = {
  NOTICE: '공지',
  RESULT: '결과 발표',
  EVENT: '이벤트 안내',
};
export const resultList: { [key in ResultType]: string } = {
  NAME: '가나다순',
  LOWEST: '확률 낮은 순',
  HIGHEST: '확률 높은 순',
};
