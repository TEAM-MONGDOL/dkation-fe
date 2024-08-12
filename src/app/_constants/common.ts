export const EmptyContainer = {
  CONTENT: '내용이 존재하지 않습니다.',
} as const;

export const DragDropContent = {
  COMMENT: '첨부할 파일을 드래그하여 해당 위치에 놓아주세요.',
  SUB_COMMENT: {
    ANNOUNCEMENT: '파일은 jpeg, png 형식만 첨부할 수 있습니다.',
    POINT_APPLY: '파일은 pdf, jpg, png 형식만 첨부할 수 있습니다.',
    WKT_PLACE: '파일은 jpeg, png 형식만 첨부할 수 있습니다.',
  },
} as const;

export const PlaceOptions = ['양양', '제주도'];
export const MembersSearchQueryOptions = {
  NAME: '이름',
  ID: '아이디',
};

export const ServiceInfo = {
  tel: '031-1234-5678',
  email: 'abcdf@xxx.xxx',
  companyName: '(주)디케이테크인',
  companyAddress: '경기도 성남시 분당구 판교역로 235, 에이치스퀘어 N동 3층',
  ceo: '이원주',
  businessRegistrationNumber: '606-87-00134',
  communicationSalesReportNumber: '2020-성남분당A-1114',
};

export const ReviewInfo = {
  5: '정말 최고예요 🥰',
  4: '아주 좋아요 😊',
  3: '적당해요 🙂',
  2: '그저 그래요 😞',
  1: '별로예요 😨',
};

export const StatusConfig = {
  APPLIED: {
    textLabel: '진행 중',
    buttonText: '신청 취소하기',
    textLabelClass: 'bg-white text-negative border border-negative',
    buttonStyle: 'red',
    buttonDisabled: false,
  },
  RAFFLE_WAIT: {
    textLabel: '추첨 대기',
    buttonText: '신청 취소하기',
    textLabelClass: 'bg-sub-100 text-black border border-sub-100',
    buttonStyle: 'lightGray',
    buttonDisabled: true,
  },
  NO_WINNING: {
    textLabel: '미당첨',
    buttonText: '미당첨',
    textLabelClass: 'border border-negative bg-negative text-white',
    buttonStyle: 'red',
    buttonDisabled: true,
  },
  CONFIRM_WAIT: {
    textLabel: '당첨',
    buttonText: '방문 확정하기',
    textLabelClass: 'bg-primary text-black border border-yellow-button-line',
    buttonStyle: 'yellow',
    buttonDisabled: false,
  },
  CANCEL: {
    textLabel: '방문 포기',
    buttonText: '방문 포기',
    textLabelClass: 'bg-sub-300 text-white border border-sub-300',
    buttonStyle: 'darkGray',
    buttonDisabled: true,
  },
  WAIT: {
    textLabel: '미당첨',
    buttonText: (waitingNumber: number) => `대기번호 (${waitingNumber})번`,
    textLabelClass: 'border border-negative bg-negative text-white',
    buttonStyle: 'red',
    buttonDisabled: true,
  },
  CONFIRM: {
    textLabel: '방문 확정',
    buttonText: '방문 확정',
    textLabelClass: 'border-gray-500 bg-gray-100 text-gray-500',
    buttonStyle: 'darkGray',
    buttonDisabled: true,
  },
  VISITED: {
    textLabel: '방문 완료',
    buttonText: '후기 작성하기',
    textLabelClass: 'bg-primary text-black border border-yellow-button-line',
    buttonStyle: 'red',
    buttonDisabled: false,
  },
} as const;
