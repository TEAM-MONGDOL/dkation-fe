export type OrderType = 'RECENT' | 'OLDEST';

export const orderList: { [key in OrderType]: string } = {
  RECENT: '최신순',
  OLDEST: '오래된순',
};
export type StatusType = 'ALL' | 'WILL' | 'PROCEED' | 'COMPLETE';

export const statusList: { [key in StatusType]: string } = {
  ALL: '전체',
  WILL: '모집 예정',
  PROCEED: '모집 중',
  COMPLETE: '모집 완료',
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
