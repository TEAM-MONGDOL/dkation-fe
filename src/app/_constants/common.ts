export const EmptyContainer = {
  CONTENT: '내용이 존재하지 않습니다.',
} as const;

export const DragDropContent = {
  COMMENT: '첨부할 파일을 드래그하여 해당 위치에 놓아주세요.',
  SUBCOMMENT: '파일은 jpeg, png 형식만 첨부할 수 있습니다.',
} as const;

export const NoticeOptions = [
  { label: '공지사항', key: 'ANNOUNCEMENT' },
  { label: '결과', key: 'RESULT' },
  { label: '이벤트', key: 'EVENT' },
];

export const PlaceOptions = ['양양', '제주도'];
export const MembersSearchQueryOptions = {
  NAME: '이름',
  ID: '아이디',
};
