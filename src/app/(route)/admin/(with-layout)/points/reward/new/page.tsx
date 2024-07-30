'use client';

import { FilterListIcon } from '@/_assets/icons';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import SelectContainer from '@/_components/common/containers/SelectContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import InputModule from '@/_components/common/modules/InputModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// TODO : 타입 선언 필요
type MemberType = {
  id: number;
  name: string;
  team: string;
  personalId: string;
};

const data: MemberType[] = [
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
  {
    id: 3,
    name: '박민수',
    team: '기획팀',
    personalId: 'park123',
  },
  {
    id: 4,
    name: '홍길동',
    team: '개발팀',
    personalId: 'hong123',
  },
];

const AdminPointsRewardNewPage = () => {
  const router = useRouter();
  const [selectedRequest, setSelectedRequest] = useState<MemberType[]>([]);
  const [selectedDelete, setSelectedDelete] = useState<MemberType[]>([]);
  const [isConfirmModelOpen, setIsConfirmModelOpen] = useState(false);
  const [isTeamFilterOpen, setIsTeamFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('봉사활동');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    '개발팀',
    '디자인팀',
    '기획팀',
  ]);

  return (
    <div className="flex h-full w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="단체 포인트 등록" />
      <section className="flex w-full flex-col gap-y-[60px]">
        <div className="flex w-[200px] flex-col gap-y-4">
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
        <div className="flex w-full flex-1 gap-x-5">
          <div className="flex flex-1 flex-col gap-y-4">
            <h3 className="font-bold">대상 선택</h3>
            <div className="flex w-full flex-col gap-y-10">
              <div className="flex w-full items-center gap-x-5">
                <div className="grow">
                  <SearchingBoxModule
                    placeholder="이름을 검색하세요."
                    onClick={() => {}}
                    height="h-5xl"
                    widthFull
                  />
                </div>
                <div className="relative">
                  <div
                    role="presentation"
                    className="flex h-5xl cursor-pointer items-center justify-between gap-x-3 rounded-regular border border-stroke-100 px-4 py-3.5"
                    onClick={() => setIsTeamFilterOpen(!isTeamFilterOpen)}
                  >
                    <p className="text-4">소속 전체</p>
                    <Image
                      src={FilterListIcon}
                      alt="filterlist"
                      width={20}
                      height={20}
                    />
                  </div>
                  {isTeamFilterOpen && (
                    <div className="absolute bottom-[-10px] right-0 translate-y-full bg-white">
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
              <TableContainer maxHeight="max-h-[500px]">
                <TableHeaderModule>
                  <TableHeaderAtom
                    isFirst
                    width="100px"
                    isBoolean={selectedRequest.length === data.length}
                    onClickBoolean={() => {
                      if (selectedRequest.length === data.length) {
                        setSelectedRequest([]);
                      } else {
                        setSelectedRequest(data);
                      }
                    }}
                  />
                  <TableHeaderAtom width="100px">이름</TableHeaderAtom>
                  <TableHeaderAtom>소속</TableHeaderAtom>
                  <TableHeaderAtom isLast>아이디</TableHeaderAtom>
                </TableHeaderModule>
                <tbody>
                  {data.length <= 0 ? (
                    <EmptyContainer colSpan={4} />
                  ) : (
                    data.map((item) => (
                      <TableBodyModule key={item.id}>
                        <TableBodyAtom
                          isFirst
                          isBoolean={selectedRequest.includes(item)}
                          onClickBoolean={() => [
                            setSelectedRequest((prev) =>
                              prev.includes(item)
                                ? prev.filter((current) => current !== item)
                                : [...prev, item],
                            ),
                          ]}
                        />
                        <TableBodyAtom>{item.name}</TableBodyAtom>
                        <TableBodyAtom>{item.team}</TableBodyAtom>
                        <TableBodyAtom isLast>{item.personalId}</TableBodyAtom>
                      </TableBodyModule>
                    ))
                  )}
                </tbody>
              </TableContainer>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-y-4">
            <h3 className="font-bold">지급 대상({selectedRequest.length})</h3>
            <div className="flex flex-col gap-y-10">
              <div className="flex w-full items-center gap-x-5">
                <div className="grow">
                  <SearchingBoxModule
                    placeholder="이름을 검색하세요."
                    onClick={() => {}}
                    height="h-5xl"
                    widthFull
                  />
                </div>
                <ButtonAtom
                  type="button"
                  buttonStyle="dark"
                  text="삭제"
                  onClick={() => {
                    setSelectedRequest((prev) =>
                      prev.filter(
                        (current) => !selectedDelete.includes(current),
                      ),
                    );
                    setSelectedDelete([]);
                  }}
                />
              </div>
              <TableContainer maxHeight="max-h-[500px]">
                <TableHeaderModule>
                  <TableHeaderAtom
                    isFirst
                    width="100px"
                    isBoolean={
                      selectedDelete.length === selectedRequest.length &&
                      selectedRequest.length !== 0
                    }
                    onClickBoolean={() => {
                      if (selectedDelete.length === selectedRequest.length) {
                        setSelectedDelete([]);
                      } else {
                        setSelectedDelete(selectedRequest);
                      }
                    }}
                  />
                  <TableHeaderAtom width="100px">이름</TableHeaderAtom>
                  <TableHeaderAtom>소속</TableHeaderAtom>
                  <TableHeaderAtom isLast>아이디</TableHeaderAtom>
                </TableHeaderModule>
                <tbody>
                  {selectedRequest.length <= 0 ? (
                    <EmptyContainer colSpan={4} />
                  ) : (
                    selectedRequest.map((item) => (
                      <TableBodyModule key={item.id}>
                        <TableBodyAtom
                          isFirst
                          isBoolean={selectedDelete.includes(item)}
                          onClickBoolean={() => [
                            setSelectedDelete((prev) =>
                              prev.includes(item)
                                ? prev.filter((current) => current !== item)
                                : [...prev, item],
                            ),
                          ]}
                        />
                        <TableBodyAtom>{item.name}</TableBodyAtom>
                        <TableBodyAtom>{item.team}</TableBodyAtom>
                        <TableBodyAtom isLast>{item.personalId}</TableBodyAtom>
                      </TableBodyModule>
                    ))
                  )}
                </tbody>
              </TableContainer>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <ButtonAtom
            type="submit"
            buttonStyle="yellow"
            onClick={() => {
              if (selectedType === '') {
                // TODO : alert 디자인 적용 필요
                alert('분류를 선택해주세요.');
                return;
              }
              if (selectedRequest.length === 0) {
                // TODO : alert 디자인 적용 필요
                alert('지급 대상을 선택해주세요.');
                return;
              }
              setIsConfirmModelOpen(true);
            }}
            text="포인트 등록"
          />
        </div>
        {isConfirmModelOpen && (
          <ModalModule
            title="단체 포인트를 등록하시겠습니까?"
            confirmText="등록"
            cancelText="취소"
            onClick={() => {
              setIsConfirmModelOpen(false);
            }}
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
                  content:
                    selectedRequest.length === 1
                      ? selectedRequest[0].name
                      : `${selectedRequest[0].name} 외 ${selectedRequest.length - 1}인`,
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
