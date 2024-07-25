'use client';

import { useRouter } from 'next/navigation';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import TableContainer from '@/_components/common/containers/TableContainer';

const headers = [
  { title: '번호', width: '60' },
  { title: '구분', width: '100' },
  { title: '제목', flexGrow: true },
  { title: '작성일', width: '200' },
  { title: '상세보기', width: '80' },
];

const data = [
  {
    id: 1,
    번호: '1',
    구분: '공지사항',
    제목: '공지입니다',
    작성일: '2024-07-20',
    상세보기: '상세보기',
  },
  {
    id: 2,
    번호: '2',
    구분: '이벤트 안내',
    제목: '이벤트 안내',
    작성일: '2024-07-21',
    상세보기: '상세보기',
  },
  {
    id: 3,
    번호: '3',
    구분: '결과 발표',
    제목: '8월 3주차 워케이션 결과 발표 : 양양',
    작성일: '2024-07-21',
    상세보기: '상세보기',
  },
];

const NoticesListPage = () => {
  const router = useRouter();

  const moveToWritePage = () => {
    router.push('/admin/notices/write');
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-12">
        <TitleBarModule title="공지사항 목록" />
        <div className="flex items-center space-x-4 ml-auto">
          <SearchingBoxModule placeholder="이름을 검색하세요" filter />
        </div>
      </div>
      <TableContainer headers={headers} data={data} />
      <div className="flex items-center">
        <div className="flex-1 flex justify-center">
          <PaginationModule />
        </div>
        <ButtonAtom buttonType="yellow" onClick={moveToWritePage}>
          글쓰기
        </ButtonAtom>
      </div>
    </div>
  );
};

export default NoticesListPage;
