export type OrderType = 'RECENT' | 'OLDEST';

export const orderList: { [key in OrderType]: string } = {
  RECENT: '최신순',
  OLDEST: '오래된순',
};

export type PointRewardType = 'PERSONAL' | 'GROUP';

export const pointRewardList: { [key in PointRewardType]: string } = {
  PERSONAL: '개인',
  GROUP: '단체',
};

export type NoticeType = 'NOTICE' | 'RESULT' | 'EVENT';

export const noticeList: { [key in NoticeType]: string } = {
  NOTICE: '공지',
  RESULT: '결과 발표',
  EVENT: '이벤트 안내',
};

export type ResultType = 'NAME' | 'LOWEST' | 'HIGHEST';

export const resultList: { [key in ResultType]: string } = {
  NAME: '가나다순',
  LOWEST: '확률 낮은 순',
  HIGHEST: '확률 높은 순',
};

export type TeamType =
  | 'MANAGEMENT'
  | 'SALES'
  | 'MARKETING'
  | 'PROMOTION'
  | 'DEV';

export const resultList: { [key in ResultType]: string } = {
  NAME: '가나다순',
  LOWEST: '확률 낮은 순',
  HIGHEST: '확률 높은 순',
};

export type PointRequestStatusType = 'WAITING' | 'REJECTED' | 'ACCEPTED';

export const pointRequestStatusList: {
  [key in PointRequestStatusType]: string;
} = {
  WAITING: '대기',
  REJECTED: '반려',
  ACCEPTED: '승인',
};

export type LocationType =
  | 'SEOUL'
  | 'GANGWON'
  | 'CHUNGCEOUNG'
  | 'JEONLA'
  | 'GYEONGSANG'
  | 'JEJU'
  | 'ABROAD';
};

export const LocationList: { [key in LocationType]: string } = {
  SEOUL: '서울',
  GANGWON: '강원',
  CHUNGCEOUNG: '충청',
  JEONLA: '전라',
  GYEONGSANG: '경상',
  JEJU: '제주',
  ABROAD: '해외',
};

export type PointOrderType = 'POINT_HIGHEST' | 'POINT_LOWEST';

export const pointOrderList: { [key in PointOrderType]: string } = {
  POINT_HIGHEST: '배팅 포인트 높은 순',
  POINT_LOWEST: '배팅 포인트 낮은 순',
};

export type StatusType =
  | 'APPLIED'
  | 'DRAW_WAITING'
  | 'FAIL'
  | 'CONFIRMED_WAITING'
  | 'CANCEL'
  | 'CONFIRM'
  | 'WAITING'
  | 'COMPLETED';

export const statusList: { [key in StatusType]: string } = {
  APPLIED: '신청완료',
  DRAW_WAITING: '추첨대기',
  FAIL: '미당첨',
  CONFIRMED_WAITING: '확정대기',
  CANCEL: '당첨취소',
  CONFIRM: '당첨확정',
  WAITING: '대기',
  COMPLETED: '일정종료',
};
