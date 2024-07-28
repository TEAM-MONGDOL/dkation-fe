'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import FileModule from '@/_components/common/modules/FileModule';
import InputModule from '@/_components/common/modules/InputModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';

const waitingData = {
  id: 1,
  status: 'WAITING',
  name: '홍길동',
  personalId: 'hong.gil',
  type: '봉사활동',
  createdAt: '2024.06.12',
  approvedAt: null,
  content: '봉사활동을 했습니다.',
  fileName: 'file.pdf',
  fileType: 'other',
  fileUrl: 'www.naver.com',
};

const acceptedData = {
  id: 1,
  status: 'ACCEPTED',
  name: '홍길동',
  personalId: 'hong.gil',
  type: '봉사활동',
  createdAt: '2024.06.12',
  approvedAt: '2024.06.13',
  content: '봉사활동을 했습니다.',
  fileName: 'file.pdf',
  fileType: 'other',
  fileUrl: 'www.naver.com',
};

const rejectedData = {
  id: 1,
  status: 'REJECTED',
  name: '홍길동',
  personalId: 'hong.gil',
  type: '봉사활동',
  createdAt: '2024.06.12',
  approvedAt: '2024.06.13',
  content: '봉사활동을 했습니다.',
  fileName: 'file.pdf',
  fileType: 'other',
  fileUrl: 'www.naver.com',
};

const data = waitingData;

const AdminPointsRequestDetailPage = () => {
  return (
    <div className="w-full flex flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 신청 내역 상세" type="LEFT" />
      <section className="w-full flex flex-col gap-y-[30px]">
        {data.status !== 'WAITING' && (
          <p
            className={`py-4 px-5 w-full flex items-center font-semibold rounded-regular ${data.status === 'ACCEPTED' ? 'bg-[#FEEC66] border border-primary' : 'bg-[#E1E1E1] border border-sub-100'}`}
          >
            {data.status === 'ACCEPTED'
              ? '이미 승인된 내역입니다.'
              : '이미 반려된 내역입니다.'}
          </p>
        )}
        <div className="w-full flex gap-x-[30px]">
          <div className="basis-2/5 flex flex-col gap-y-[30px]">
            <InputModule
              subtitle="회원 정보"
              value={`${data.name} (${data.personalId})`}
            />
            <InputModule subtitle="분류" value={data.type} />
            <InputModule subtitle="신청 일시" value={data.createdAt} />
            {/* TODO : disable 속성 필요할 듯 */}
            <InputModule
              subtitle="지급 일시"
              value={!data.approvedAt ? '-' : data.approvedAt}
            />
          </div>
          <div className="flex-1 h-full flex flex-col gap-y-[30px]">
            <div className="flex flex-col gap-y-4">
              <h3 className="font-bold">증빙 서류</h3>
              {/* TODO : 높이 조절 필요 */}
              <FileModule
                fileName={data.fileName}
                fileType="other"
                fileUrl={data.fileUrl}
                buttonType="edit"
                onEdit={() => {}}
              />
            </div>
            {/* TODO : Readonly, 카운트 조건부, height 필요 */}
            <TextAreaModule
              placeholder="내용을 입력하세요."
              size="SMALL"
              maxLength={500}
              value={data.content}
              name="content"
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-x-5 pt-[30px]">
          {/* TODO : 좀 더 길게 버튼 길이 고정 필요 */}
          <ButtonAtom buttonType="dark" onClick={() => {}}>
            반려
          </ButtonAtom>
          <ButtonAtom buttonType="yellow" onClick={() => {}}>
            승인
          </ButtonAtom>
        </div>
      </section>
    </div>
  );
};

export default AdminPointsRequestDetailPage;
