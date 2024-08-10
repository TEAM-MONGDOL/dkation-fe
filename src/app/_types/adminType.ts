import { z } from 'zod';
// ResponseSchema
export const pageInfoSchema = z.object({
  pageNum: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export const wktInfoSchema = z.object({
  wktId: z.number(),
  title: z.string(),
  wktPlaceTitle: z.string(),
  thumbnailUrl: z.string(),
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

export const wkDetailInfoSchema = z.object({
  title: z.string(),
  totalRecruit: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  applyStartDate: z.string(),
  applyEndDate: z.string(),
  description: z.string(),
  wktPlaceId: z.number(),
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

export const wktPlaceDetailShema = z.object({
  wktPlaceDetailInfo: z.object({
    id: z.number(),
    place: z.string(),
    address: z.string(),
    maxPeople: z.number(),
    createdAt: z.string(),
    description: z.string(),
    thumbnailUrls: z.array(z.string().nullable()),
  }),
});

export const pointSupplyTypeSchema = z.union([
  z.literal('PERSONAL'),
  z.literal('GROUP'),
]);

export const pointSupplyInfoSchema = z.object({
  id: z.number(),
  count: z.number(),
  pointSupplyType: pointSupplyTypeSchema,
  pointTitle: z.string(),
  name: z.string(),
  quantity: z.number(),
  supplyTime: z.string(),
});

export const pointSupplyListSchema = z.object({
  pointSupplyList: pointSupplyInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const pointSupplyMemberSchema = z.object({
  name: z.string(),
  department: z.string(),
  accountId: z.string(),
});

export const pointSupplyDetailInfoSchema = z.object({
  pointSupplyType: pointSupplyTypeSchema,
  pointTitle: z.string(),
  supplyTime: z.string(),
});

export const pointSupplyDetailSchema = z.object({
  pointSupplyDetailInfo: pointSupplyDetailInfoSchema,
  pointSupplyMemberList: pointSupplyMemberSchema.array(),
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

export const pointPolicySchema = z.object({
  id: z.number(),
  policyTitle: z.string(),
  detail: z.string(),
  modifiedAt: z.string(),
  quantity: z.number(),
});

export const pointPolicyListSchema = z.object({
  pointPolicyList: pointPolicySchema.array(),
  pageInfo: pageInfoSchema,
});

export const pointPolicyDetailSchema = z.object({
  policyTitle: z.string(),
  detail: z.string(),
  lastModifiedAt: z.string(),
  quantity: z.number(),
});

export const pointApplyTypeSchema = z.union([
  z.literal('PENDING'),
  z.literal('APPROVED'),
  z.literal('DECLINED'),
]);

export const pointApplyInfoSchema = z.object({
  pointApplyId: z.number(),
  pointTitle: z.string(),
  name: z.string(),
  applyTime: z.string(),
  reviewTime: z.string(),
  applyType: pointApplyTypeSchema,
});

export const pointApplyInfoListSchema = z.object({
  pointApplyInfos: z.array(pointApplyInfoSchema),
  pageInfo: pageInfoSchema,
});

export const fileInfoSchema = z.object({
  url: z.string(),
  fileName: z.string(),
});

export const pointApplyDetailInfoSchema = z.object({
  pointApplyId: z.number(),
  name: z.string(),
  accountId: z.string(),
  pointTitle: z.string(),
  description: z.string(),
  fileInfo: fileInfoSchema.nullable().optional(),
  applyType: pointApplyTypeSchema,
  declineReason: z.string().nullable().optional(),
  createdAt: z.string(),
  reviewTime: z.string().nullable().optional(),
});

export const fileUrlSchema = z.string();

export const fileUrlsSchema = z.object({
  fileUrls: fileUrlSchema.array(),
});

export const announcementInfoSchema = z.object({
  id: z.number(),
  announcementType: z.union([
    z.literal('ANNOUNCEMENT'),
    z.literal('RESULT'),
    z.literal('EVENT'),
  ]),
  title: z.string(),
  createdAt: z.string(),
});

export const announcementListSchema = z.object({
  announcementInfos: announcementInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const announcementDetailSchema = z.object({
  id: z.number(),
  announcementType: z.union([
    z.literal('ANNOUNCEMENT'),
    z.literal('RESULT'),
    z.literal('EVENT'),
  ]),
  title: z.string(),
  description: z.string(),
  fileInfos: fileInfoSchema.array().nullable().optional(),
  createdAt: z.string().optional(),
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
  applyStatusType: applyStatusSchema,
});

export const applyListSchema = z.object({
  applyInfoList: applyInfoSchema.array(),
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

export const penaltyInfoSchema = z.object({
  wktName: z.string().nullable(),
  penaltyType: z.union([
    z.literal('NOSHOW'),
    z.literal('REPORT'),
    z.literal('NEGLIGENCE'),
    z.literal('ABUSE'),
  ]),
  createdAt: z.string(),
});

export const penaltyListSchema = z.object({
  penaltyInfos: penaltyInfoSchema.array(),
  penaltyAmount: z.number(),
  memberType: z.union([
    z.literal('EMPLOYMENT'),
    z.literal('LEAVE'),
    z.literal('PENALTY'),
  ]),
});

export const wktPlaceInfoSchema = z.object({
  id: z.number(),
  thumbnailUrl: z.string(),
  place: z.string(),
  address: z.string(),
  createdAt: z.string(),
  maxPeople: z.number(),
  description: z.string(),
});

export const workationPlaceListSchema = z.object({
  wktPlaceInfos: wktPlaceInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

export const wkUserDetailInfoSchema = z.object({
  title: z.string(),
  totalRecruit: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  applyStartDate: z.string(),
  applyEndDate: z.string(),
  description: z.string(),
  place: z.string(),
  address: z.string(),
  isApplied: z.boolean(),
  wktPlaceId: z.number(),
  files: fileInfoSchema.array().nullable().optional(),
});
export const wkUserPlaceReviewInfoSchema = z.object({
  id: z.number(),
  reviewer: z.string(),
  department: z.string(),
  wktTitle: z.string(),
  rating: z.number(),
  contents: z.string(),
  lastModifiedAt: z.string(),
  fileInfos: fileInfoSchema.array().nullable().optional(),
});

export const workationUserPlaceReviewSchema = z.object({
  reviewInfosForWkt: wkUserPlaceReviewInfoSchema.array(),
  pageInfo: pageInfoSchema,
});

// Type
export type PageableType = {
  page?: number;
  size?: number;
  sort?: string;
};

export type StatusType = z.infer<typeof applyStatusSchema>;

export type MemberType = z.infer<typeof memberInfoSchema>;

export type PointApplyType = z.infer<typeof pointApplyTypeSchema>;

export const pointApplyTypeList: PointApplyType[] = [
  'PENDING',
  'APPROVED',
  'DECLINED',
];

export const pointApplyTypeConvertList: { [key in PointApplyType]: string } = {
  PENDING: '대기',
  APPROVED: '승인',
  DECLINED: '반려',
};

export type PointSupplyType = z.infer<typeof pointSupplyTypeSchema>;

export const pointSupplyTypeConvertList: { [key in PointSupplyType]: string } =
  {
    PERSONAL: '개인',
    GROUP: '단체',
  };

export type OrderType = 'DESC' | 'ASC';

export type ReviewOrderType = 'ASC' | 'DESC' | 'STARASC' | 'STARDESC';

export type PointRewardType = 'PERSONAL' | 'GROUP';

export type NoticeType = 'ANNOUNCEMENT' | 'RESULT' | 'EVENT';

export type ResultType = 'NAME' | 'LOWEST' | 'HIGHEST';

export type WktStatusType = 'PLANNED' | 'ONGOING' | 'CLOSED';

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

export type PenaltyType = 'NOSHOW' | 'REPORT' | 'NEGLIGENCE' | 'ABUSE';

// Convert Type / List
export const applyStatusList: StatusType[] = [
  'APPLIED',
  'RAFFLE_WAIT',
  'NO_WINNING',
  'CONFIRM_WAIT',
  'CANCEL',
  'CONFIRM',
  'WAIT',
  'VISITED',
];

export const applyStatusListConverter: { [key in StatusType]: string } = {
  APPLIED: '신청완료',
  RAFFLE_WAIT: '추첨대기',
  NO_WINNING: '미당첨',
  CONFIRM_WAIT: '확정대기',
  CANCEL: '당첨취소',
  CONFIRM: '당첨확정',
  WAIT: '대기',
  VISITED: '일정종료',
};

export const wktStatusList: { [key in WktStatusType]: string } = {
  PLANNED: '모집 예정',
  ONGOING: '모집 중',
  CLOSED: '모집 완료',
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
  DESC: '최신순',
  ASC: '오래된순',
};

export const reviewOrderList: { [key in ReviewOrderType]: string } = {
  ASC: '최신순',
  DESC: '오래된순',
  STARASC: '별점 높은 순',
  STARDESC: '별점 낮은 순',
};

export const pointRewardList: { [key in PointRewardType]: string } = {
  PERSONAL: '개인',
  GROUP: '단체',
};
export const noticeList: { [key in NoticeType]: string } = {
  ANNOUNCEMENT: '공지',
  RESULT: '결과 발표',
  EVENT: '이벤트 안내',
};
export const resultList: { [key in ResultType]: string } = {
  NAME: '가나다순',
  LOWEST: '확률 낮은 순',
  HIGHEST: '확률 높은 순',
};

export const penaltyList: { [key in PenaltyType]: string } = {
  NOSHOW: '노쇼',
  REPORT: '협력체 신고',
  NEGLIGENCE: '근무 태만',
  ABUSE: '포인트 제도 악용',
};
