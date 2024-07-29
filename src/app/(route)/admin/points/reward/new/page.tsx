'use client';

import { FilterListIcon } from '@/_assets/icons';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import SelectContainer from '@/_components/common/containers/SelectContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const headers = [
  // TODO : 체크박스 넣어야됨
  { title: '이름', width: '100px' },
  { title: '소속' },
  { title: '아이디', width: '100px' },
];

const data = [
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'kim123',
  },
  {
    id: 2,
    이름: '이영희',
    소속: '디자인팀',
    아이디: 'lee123',
  },
  {
    id: 3,
    이름: '박민수',
    소속: '기획팀',
    아이디: 'park123',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'kim123',
  },
  {
    id: 2,
    이름: '이영희',
    소속: '디자인팀',
    아이디: 'lee123',
  },
  {
    id: 3,
    이름: '박민수',
    소속: '기획팀',
    아이디: 'park123',
  },
  {
    id: 3,
    이름: '박민수',
    소속: '기획팀',
    아이디: 'park123',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'kim123',
  },
  {
    id: 2,
    이름: '이영희',
    소속: '디자인팀',
    아이디: 'lee123',
  },
];

const AdminPointsRewardNewPage = () => {
  const router = useRouter();
  const [isConfirmModelOpen, setIsConfirmModelOpen] = useState(false);
  const [isTeamFilterOpen, setIsTeamFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('봉사활동');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    '개발팀',
    '디자인팀',
    '기획팀',
  ]);
  // TODO : 멤버 타입 선언 필요
  const [selectedMember, setSelectedMember] = useState<
    { id: number; name: string; team: string; personalId: string }[]
  >([
    {
      id: 1,
      name: '김철수',
      team: '개발팀',
      personalId: 'kim123',
    },
    {
      id: 2,
      name: '이영희',
      team: '디자인팀',
      personalId: 'lee123',
    },
  ]);
  return (
    <div className="w-full h-full flex flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="단체 포인트 등록" />
      <section className="w-full flex flex-col gap-y-[60px]">
        <div className="w-1/2 flex flex-col gap-y-4">
          <h3 className="font-bold">분류</h3>
          {/* TODO : 애니메이션 필요 */}
          {/* TODO : Width 조정 필요 (기본, 아이템 모두) */}
          {/* TODO : selectedOption도 전달받는 게 좋을 듯 */}
          <DropdownModule
            options={['봉사활동', '자기계발']}
            onSelect={setSelectedType}
            placeholder="분류 선택"
          />
        </div>
        <div className="w-full flex flex-1 gap-x-5">
          <div className="flex-1 flex flex-col gap-y-4">
            <h3 className="font-bold">대상 선택</h3>
            <div className="flex flex-col gap-y-10">
              <div className="w-full flex items-center gap-x-5">
                {/* TODO : Width, Height 조정 필요 */}
                <SearchingBoxModule
                  placeholder="이름을 검색하세요."
                  onClick={() => {}}
                />
                <div className="relative">
                  <div
                    role="presentation"
                    className="w-[153px] flex rounded-regular justify-between border border-stroke-100 px-4 py-3.5 cursor-pointer"
                    onClick={() => setIsTeamFilterOpen(!isTeamFilterOpen)}
                  >
                    <p>소속 전체</p>
                    <Image
                      src={FilterListIcon}
                      alt="filterlist"
                      width={20}
                      height={20}
                    />
                  </div>
                  {isTeamFilterOpen && (
                    <div className="absolute right-0 bottom-[-10px] translate-y-full bg-white">
                      <SelectContainer
                        title="소속"
                        options={['개발팀', '디자인팀', '기획팀']}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="max-h-[500px] overflow-y-scroll">
                {/* TODO : max-h 를 table body에 넣어도 좋을 듯 */}
                <TableContainer headers={headers} data={data} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-y-4">
            <h3 className="font-bold">지급 대상({selectedMember.length})</h3>
            <div className="flex flex-col gap-y-10">
              <div className="w-full flex items-center gap-x-5">
                {/* TODO : Width, Height 조정 필요 */}
                <SearchingBoxModule
                  placeholder="이름을 검색하세요."
                  onClick={() => {}}
                />
                <ButtonAtom buttonType="dark" onClick={() => {}}>
                  삭제
                </ButtonAtom>
              </div>
              <div className="max-h-[500px] overflow-y-scroll">
                {/* TODO : max-h 를 table body에 넣어도 좋을 듯 */}
                <TableContainer headers={headers} data={data} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <ButtonAtom
            buttonType="yellow"
            onClick={() => {
              if (selectedType === '') {
                // TODO : alert 디자인 적용 필요
                alert('분류를 선택해주세요.');
                return;
              }
              if (selectedMember.length === 0) {
                // TODO : alert 디자인 적용 필요
                alert('지급 대상을 선택해주세요.');
                return;
              }
              setIsConfirmModelOpen(true);
            }}
          >
            포인트 등록
          </ButtonAtom>
        </div>
        {isConfirmModelOpen && (
          // content 없애고 children으로 대체 필요
          <ModalModule
            title="단체 포인트를 등록하시겠습니까?"
            content="포인트 정보 안내"
            confirmText="등록"
            cancelText="취소"
            onConfirm={() => {
              //  TODO : 포인트 등록 API 호출
              alert('포인트 등록 완료');
              setIsConfirmModelOpen(false);
              router.push('/admin/points/reward');
            }}
            onCancel={() => {
              setIsConfirmModelOpen(false);
            }}
          >
            <InfoSectionContainer
              data={[
                {
                  subtitle: '분류',
                  content: selectedType,
                },
                {
                  subtitle: '지급 대상',
                  content: `${selectedMember[0].name} 외 ${selectedMember.length - 1}인`,
                },
                {
                  subtitle: '지급 포인트',
                  content: '1000P',
                },
              ]}
            />
          </ModalModule>
        )}
      </section>
    </div>
  );
};

export default AdminPointsRewardNewPage;
