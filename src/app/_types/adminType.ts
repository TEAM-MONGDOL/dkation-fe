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
