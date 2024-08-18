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
import ModalModule from '@/_components/common/modules/ModalModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useGetMemberListInifiniteQuery } from '@/_hooks/admin/useGetMemberListInfiniteQuery';
import { useGetPointPolicyQuery } from '@/_hooks/admin/useGetPointPolicyQuery';
import { usePostPointSupplyMutation } from '@/_hooks/admin/usePostPointSupplyMutation';
import { MemberType } from '@/_types/adminType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminLoading from '@/_components/admin/adminLoading';
import { departmentList } from '@/_types/commonType';

const AdminPointsRewardNewPage = () => {
  const router = useRouter();
  const [selectedRequest, setSelectedRequest] = useState<MemberType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDelete, setSelectedDelete] = useState<MemberType[]>([]);
  const [isConfirmModelOpen, setIsConfirmModelOpen] = useState(false);
  const [isTeamFilterOpen, setIsTeamFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(departmentList);

  const {
    data: memberList,
    fetchNextPage: memberListFetchNextPage,
    hasNextPage: memberListHasNextPage,
    isLoading: memberListIsLoading,
  } = useGetMemberListInifiniteQuery({
    searchText,
    department: selectedOptions.join(','),
    pageable: { page: 1, size: 100, sort: 'name,ASC' },
  });

  const {
    data: policyList,
    isLoading: policyListIsLoading,
    isError: policyListIsError,
  } = useGetPointPolicyQuery({
    pageable: { page: 1, size: 100 },
  });

  const { mutate: tryPostPointSupply } = usePostPointSupplyMutation({
    successCallback: () => {
      setIsConfirmModelOpen(false);
      router.push('/admin/points/reward');
    },
  });

  return (
    <section className="flex h-full w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="단체 포인트 등록" />
      <section className="flex w-full flex-col gap-y-[60px]">
        <div className="flex flex-col gap-y-4">
          <h3 className="font-bold">분류</h3>
          <DropdownModule
            options={
              policyList?.pointPolicyList.map((policy) => policy.policyTitle) ||
              []
            }
            size="large"
            onSelect={(option) => {
              setSelectedType(
                policyList?.pointPolicyList.find(
                  (policy) => policy.policyTitle === option,
                )?.id || null,
              );
            }}
            selectedOption={
              policyList?.pointPolicyList.find(
                (policy) => policy.id === selectedType,
              )?.policyTitle || null
            }
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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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
                    <div className="absolute bottom-[-10px] right-0 z-10 translate-y-full bg-white">
                      <SelectContainer
                        title="소속"
                        options={departmentList}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                      />
                    </div>
                  )}
                </div>
              </div>
              <TableContainer
                maxHeight="max-h-[300px]"
                isInfiniteScroll
                infiniteScrollProps={{
                  load: <AdminLoading />,
                  hasMore: memberListHasNextPage,
                  loadMore: () => {
                    memberListFetchNextPage();
                  },
                  useWindow: false,
                }}
              >
                <TableHeaderModule>
                  <TableHeaderAtom
                    isFirst
                    width="80px"
                    isBoolean={
                      memberList &&
                      selectedRequest.length ===
                        memberList.pages.reduce(
                          (acc, page) => acc + page.memberInfos.length,
                          0,
                        )
                    }
                    onClickBoolean={() => {
                      if (
                        selectedRequest.length ===
                        memberList?.pages.reduce(
                          (acc, page) => acc + page.memberInfos.length,
                          0,
                        )
                      ) {
                        setSelectedRequest([]);
                      } else {
                        setSelectedRequest(
                          memberList?.pages.reduce(
                            (acc, page) => [...acc, ...page.memberInfos],
                            [] as MemberType[],
                          ) || [],
                        );
                      }
                    }}
                  />
                  <TableHeaderAtom>이름</TableHeaderAtom>
                  <TableHeaderAtom>소속</TableHeaderAtom>
                  <TableHeaderAtom isLast>아이디</TableHeaderAtom>
                </TableHeaderModule>
                <tbody>
                  {!memberList || selectedOptions.length <= 0 ? (
                    memberListIsLoading ? (
                      <EmptyContainer colSpan={4} text="is loading..." />
                    ) : (
                      <EmptyContainer colSpan={4} text="데이터가 없습니다." />
                    )
                  ) : memberList.pages[0].pageInfo.totalElements === 0 ? (
                    <EmptyContainer colSpan={4} />
                  ) : (
                    memberList.pages.map((page, pageIdx) =>
                      page.memberInfos.map((member) => (
                        <TableBodyModule key={member.accountId}>
                          <TableBodyAtom
                            isFirst
                            isBoolean={
                              !!selectedRequest.find(
                                (request) =>
                                  request.accountId === member.accountId,
                              )
                            }
                            onClickBoolean={() => [
                              setSelectedRequest((prev) =>
                                prev.includes(member)
                                  ? prev.filter((current) => current !== member)
                                  : [...prev, member],
                              ),
                            ]}
                          />
                          <TableBodyAtom>{member.name}</TableBodyAtom>
                          <TableBodyAtom>{member.department}</TableBodyAtom>
                          <TableBodyAtom isLast>
                            {member.accountId}
                          </TableBodyAtom>
                        </TableBodyModule>
                      )),
                    )
                  )}
                </tbody>
              </TableContainer>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-y-4">
            <h3 className="font-bold">지급 대상({selectedRequest.length})</h3>
            <div className="flex flex-col gap-y-10">
              <div className="flex w-full items-center justify-end gap-x-5">
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
              <TableContainer maxHeight="max-h-[300px]">
                <TableHeaderModule>
                  <TableHeaderAtom
                    isFirst
                    width="80px"
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
                  <TableHeaderAtom>이름</TableHeaderAtom>
                  <TableHeaderAtom>소속</TableHeaderAtom>
                  <TableHeaderAtom isLast>아이디</TableHeaderAtom>
                </TableHeaderModule>
                <tbody>
                  {selectedRequest.length <= 0 ? (
                    <EmptyContainer colSpan={4} />
                  ) : (
                    selectedRequest.map((item) => (
                      <TableBodyModule key={item.accountId}>
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
                        <TableBodyAtom>{item.department}</TableBodyAtom>
                        <TableBodyAtom isLast>{item.accountId}</TableBodyAtom>
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
            type="button"
            buttonStyle="yellow"
            onClick={() => {
              if (selectedType === null) {
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
            onConfirm={() => {
              tryPostPointSupply({
                policyId: selectedType!,
                body: selectedRequest.map((member) => member.accountId),
              });
            }}
            onCancel={() => {
              setIsConfirmModelOpen(false);
            }}
          >
            <InfoSectionContainer
              data={[
                {
                  subtitle: '분류',
                  content:
                    policyList?.pointPolicyList.find(
                      (policy) => policy.id === selectedType,
                    )?.policyTitle || '',
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
                  content:
                    policyList?.pointPolicyList
                      .find((policy) => policy.id === selectedType)
                      ?.quantity.toLocaleString() || '0',
                },
              ]}
            />
          </ModalModule>
        )}
      </section>
    </section>
  );
};

export default AdminPointsRewardNewPage;
