import TableContainer from '@/_components/common/containers/TableContainer';
import InputModule from '@/_components/common/modules/InputModule';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';

const data = {
  id: 1,
  구분: { text: '개인', color: 'red' },
  분류: '자기계발',
  이름: '김철수',
  지급일: '2024-07-20',
  포인트: 100,
};

const header = [
  { title: '번호', width: '100px' },
  { title: '이름', width: '140px' },
  { title: '소속' },
  { title: '아이디', width: '120px' },
];

const users = [
  {
    id: 1,
    이름: '홍길동',
    소속: '개발팀',
    아이디: 'dkation.dk',
  },
  {
    id: 2,
    이름: '홍길동',
    소속: '개발팀',
    아이디: 'dkation.dk',
  },
  {
    id: 3,
    이름: '홍길동',
    소속: '개발팀',
    아이디: 'dkation.dk',
  },
];

const AdminPointsRewardDetailPage = () => {
  return (
    <section className="w-full flex flex-col gap-y-10 overflow-y-auto">
      {/* TODO : Left onClick에 -1 적용 필요 */}
      <TitleBarModule title="포인트 지급 내역 상세" type="LEFT" />
      <div className="w-full flex gap-x-[30px] items-start">
        <div className="min-w-[400px] basis-1/3 flex flex-col gap-y-[30px]">
          {/* TODO : InputModule에 Readonly 필요, gap 추가 필요 */}
          <InputModule subtitle="구분" value={data['구분'].text} />
          <InputModule subtitle="분류" value={data['분류']} />
          <InputModule subtitle="지급일시" value={data['지급일']} />
        </div>
        <div className="flex flex-col grow p-4 gap-y-4 rounded-regular bg-cus-100 border border-stroke-100">
          <h4 className="font-bold">지급대상 ({users.length})</h4>
          <div className="flex flex-col gap-y-10 w-full">
            {/* TODO : value, onChange, width 전달해야됨 */}
            <SearchingBoxModule
              placeholder="이름을 검색하세요."
              onClick={() => {}}
            />
            <TableContainer headers={header} data={users} />
          </div>
          {/* TODO : Pagination 배경색 넣어줘야 됨 */}
          <div className="w-full flex items-center justify-center">
            {/* TODO : 클릭이벤트 및 페이지 수 적용 필요 */}
            <PaginationModule />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPointsRewardDetailPage;
