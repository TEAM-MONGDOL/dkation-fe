import { z } from 'zod';
// ResponseSchema
export const pageInfoSchema = z.object({
  pageNum: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export const fileInfoSchema = z.object({
  url: z.string(),
  fileName: z.string(),
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
  place: z.string(),
  files: fileInfoSchema.array(),
});

export const wkApplyPercentageInfoSchema = z.object({
  percentage: z.number(),
  error: z.number(),
});
export const wktResultInfoSchema = z.object({
  name: z.string(),
  accountId: z.string(),
  department: z.string(),
  percentage: z.number(),
  applyStatusType: z.union([
    z.literal('APPLIED'),
    z.literal('RAFFLE_WAIT'),
    z.literal('NO_WINNING'),
    z.literal('CONFIRM_WAIT'),
    z.literal('CANCEL'),
    z.literal('CONFIRM'),
    z.literal('WAIT'),
    z.literal('VISITED'),
  ]),
});

export const wktResultInfosSchema = z.object({
  totalApply: z.number(),
  totalRecruit: z.number(),
  maxPoint: z.number(),
  minPoint: z.number(),
  avgPoint: z.number(),
});

export const wktWinningUserInfosSchema = z.object({
  wktTitle: z.string(),
  penaltyType: z
    .union([
      z.literal('NOSHOW'),
      z.literal('REPORT'),
      z.literal('NEGLIGENCE'),
      z.literal('ABUSE'),
    ])
    .nullable(),
  name: z.string(),
  accountId: z.string(),
  department: z.string(),
  penaltyAssignDate: z.string().nullable(),
  applyStatusType: z
    .union([
      z.literal('APPLIED'),
      z.literal('RAFFLE_WAIT'),
      z.literal('NO_WINNING'),
      z.literal('CONFIRM_WAIT'),
      z.literal('CANCEL'),
      z.literal('CONFIRM'),
      z.literal('WAIT'),
      z.literal('VISITED'),
    ])
    .nullable(),
});
export const wktWaitingUserInfosSchema = z.object({
  wktTitle: z.string(),
  penaltyType: z
    .union([
      z.literal('NOSHOW'),
      z.literal('REPORT'),
      z.literal('NEGLIGENCE'),
      z.literal('ABUSE'),
    ])
    .nullable(),
  waitingNum: z.number(),
  name: z.string(),
  accountId: z.string(),
  department: z.string(),
  applyStatusType: z
    .union([
      z.literal('APPLIED'),
      z.literal('RAFFLE_WAIT'),
      z.literal('NO_WINNING'),
      z.literal('CONFIRM_WAIT'),
      z.literal('CANCEL'),
      z.literal('CONFIRM'),
      z.literal('WAIT'),
      z.literal('VISITED'),
    ])
    .nullable(),
  penaltyAssignDate: z.string().nullable(),
});
export const wktDistributionInfosSchema = z.object({
  wktDistributionCount: z.number().array(),
});

export const WkResultPenaltyInfoSchema = z.object({
  wktResultInfo: wktResultInfosSchema,
  wktWinningUserInfos: wktWinningUserInfosSchema.array(),
  wktWaitingUserInfos: wktWaitingUserInfosSchema.array(),
  wktDistributionInfo: wktDistributionInfosSchema,
});

export const WkResultInfoSchema = z.object({
  wktMemberResultInfos: wktResultInfoSchema.array(),
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

export const wktPlaceDetailSchema = z.object({
  wktPlaceDetailInfo: z.object({
    id: z.number(),
    place: z.string(),
    address: z.string(),
    maxPeople: z.number(),
    createdAt: z.string(),
    description: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    fileInfos: fileInfoSchema.array().nullable().optional(),
  }),
});

export const wktReviewDetailSchema = z.object({
  reviewDetailInfo: z.object({
    id: z.number(),
    reviewer: z.string(),
    department: z.string(),
    wktTitle: z.string(),
    wktPlace: z.string(),
    rating: z.number(),
    lastModifiedAt: z.string(),
    contents: z.string(),
    imageUrls: z.array(z.string().nullable()),
    blindedType: z.union([z.literal('TRUE'), z.literal('FALSE')]),
    openedType: z.union([z.literal('TRUE'), z.literal('FALSE')]),
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
  pointTitle: z.string(),
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

export const announcementDetailListSchema = z.object({
  announcementDetailInfo: announcementDetailSchema,
  previousId: z.number().nullable().optional(),
  postId: z.number().nullable().optional(),
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

export const userApplyInfoSchema = z.object({
  applyId: z.number(),
  reviewId: z.number().nullable(),
  thumbnailUrl: z.string(),
  waitNumber: z.number().nullable(),
  wktId: z.number(),
  wktName: z.string(),
  place: z.string(),
  totalRecruit: z.number(),
  applyStartDate: z.string(),
  applyEndDate: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  applyStatusType: applyStatusSchema,
  bettingPoint: z.number(),
});

export const winningPercentageInfoSchema = z.object({
  percentage: z.number(),
  error: z.number(),
});

export const userApplyListSchema = z.object({
  applyInfoList: userApplyInfoSchema.array(),
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

export const bannerInfoSchema = z.object({
  id: z.number(),
  title: z.string(),
  linkUrl: z.string(),
  announcementType: z.string(),
  announcementTitle: z.string(),
  backgroundColor: z.string(),
});

export const bannerInfoListSchema = z.object({
  bannerInfoList: bannerInfoSchema.array(),
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
  latitude: z.string(),
  longitude: z.string(),
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

export const reviewsInfoForMeSchema = z.object({
  id: z.number(),
  wktTitle: z.string(),
  lastModifiedAt: z.string(),
});

export const reviewsInfosForMeListSchema = z.object({
  reviewInfosForMe: reviewsInfoForMeSchema.array(),
  pageInfo: pageInfoSchema,
});

export const reviewDetailSchema = z.object({
  id: z.number(),
  wktId: z.number(),
  reviewer: z.string(),
  department: z.string(),
  wktTitle: z.string(),
  wktPlace: z.string(),
  rating: z.number(),
  lastModifiedAt: z.string(),
  contents: z.string(),
  imageUrls: z.array(z.string()).nullable().optional(),
  blindedType: z.union([z.literal('TRUE'), z.literal('FALSE')]),
  openedType: z.union([z.literal('TRUE'), z.literal('FALSE')]),
});

export const reviewsDetailInfoSchema = z.object({
  reviewDetailInfo: reviewDetailSchema,
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

export type WktInfoType = z.infer<typeof wktInfoSchema>;

export type BannerType = z.infer<typeof bannerInfoSchema>;

export const pointApplyTypeList: PointApplyType[] = [
  'PENDING',
  'APPROVED',
  'DECLINED',
];

export const pointApplyTypeConvertList: {
  [key in PointApplyType | string]: string;
} = {
  'PENDING,APPROVED,DECLINED': '전체',
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

export type PlaceListItemType = z.infer<typeof wktPlaceInfoSchema>;

export const noticeTypeList: NoticeType[] = ['ANNOUNCEMENT', 'RESULT', 'EVENT'];

export const noticeTypeConverter: { [key in NoticeType]: string } = {
  ANNOUNCEMENT: '공지',
  RESULT: '결과 발표',
  EVENT: '이벤트 안내',
};

export type ResultType = 'ASC' | 'PERCENTAGEDESC' | 'PERCENTAGEASC';

export type WktStatusType = 'PLANNED' | 'ONGOING' | 'CLOSED';

export type TeamType =
  | 'MANAGEMENT'
  | 'SALES'
  | 'MARKETING'
  | 'PROMOTION'
  | 'DEV';

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

export type BannerStyleType = 'DARK' | 'LIGHTGRAY' | 'YELLOW';

export const bannerStyleTypeList: BannerStyleType[] = [
  'DARK',
  'LIGHTGRAY',
  'YELLOW',
];

export const colorClassConverter: { [key in BannerStyleType]: string } = {
  DARK: 'bg-sub-300',
  LIGHTGRAY: 'bg-sub-100',
  YELLOW: 'bg-primary',
};

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

// OrderList
export const membersOrderList: Record<string, string> = {
  'name,ASC': '이름순',
  'pointQuantity,DESC': '보유 포인트 높은순',
  'pointQuantity,ASC': '보유 포인트 낮은순',
};

export const wkHistoryOrderList: Record<string, string> = {
  'createdAt,DESC': '최신순',
  'createdAt,ASC': '오래된순',
  'usedPoint,DESC': '베팅 포인트 높은순',
  'usedPoint,ASC': '베팅 포인트 낮은순',
};

export const rewardOrderList: Record<string, string> = {
  'createdAt,DESC': '최신순',
  'createdAt,ASC': '오래된순',
};

export const orderList: { [key in OrderType]: string } = {
  DESC: '최신순',
  ASC: '오래된순',
};

export const reviewOrderList: { [key in ReviewOrderType]: string } = {
  ASC: '오래된 순',
  DESC: '최신순',
  STARASC: '별점 높은 순',
  STARDESC: '별점 낮은 순',
};

export const pointRewardList: { [key in PointRewardType]: string } = {
  PERSONAL: '개인',
  GROUP: '단체',
};

export const resultOrderList: { [key in ResultType]: string } = {
  ASC: '가나다 순',
  PERCENTAGEASC: '확률 높은 순',
  PERCENTAGEDESC: '확률 낮은 순',
};

export const noticeList: { [key in NoticeType]: string } = {
  ANNOUNCEMENT: '공지',
  RESULT: '결과 발표',
  EVENT: '이벤트 안내',
};

export const penaltyList: { [key in PenaltyType]: string } = {
  NOSHOW: '노쇼',
  REPORT: '협력체 신고',
  NEGLIGENCE: '근무 태만',
  ABUSE: '포인트 제도 악용',
};
