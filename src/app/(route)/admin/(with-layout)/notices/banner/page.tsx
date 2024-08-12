'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useGetBannerListInfiniteQuery } from '@/_hooks/admin/useGetBannerListInfiniteQuery';
import { useRouter } from 'next/navigation';
import { TrashIcon } from '@/_assets/icons';
import Image from 'next/image';
import { NoticeType, noticeTypeConverter } from '@/_types/adminType';
import ModalModule from '@/_components/common/modules/ModalModule';
import { useState } from 'react';
import { useDeleteBannerMutation } from '@/_hooks/admin/useDeleteBannerMutation';

const AdminBannerListPage = () => {
  const router = useRouter();
  const [selectedBannerId, setSelectedBannerId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: bannerList,
    fetchNextPage: bannerListFetchNextPage,
    hasNextPage: bannerListHasNextPage,
    isLoading: bannerListIsLoading,
  } = useGetBannerListInfiniteQuery({
    pageable: { page: 1, size: 10 },
  });

  const { mutate: deleteBanner } = useDeleteBannerMutation({
    successCallback: () => {
      setIsDeleteModalOpen(false);
      alert('삭제가 완료되었습니다.');
      setSelectedBannerId(null);
    },
    errorCallback: (error: Error) => {
      console.error('Failed to delete banner:', error);
    },
  });

  const handleDeleteClick = (bannerId: number) => {
    setSelectedBannerId(bannerId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBannerId !== null) {
      deleteBanner(selectedBannerId);
    }
  };

  return (
    <section className="flex h-full w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="배너 목록" />
      <section className="flex w-full flex-col gap-y-6xl">
        <div className="flex flex-1 flex-col gap-y-4">
          <div className="flex w-full items-center gap-x-5" />
          <TableContainer
            maxHeight="max-h-[550px]"
            isInfiniteScroll
            infiniteScrollProps={{
              load: (
                <p
                  key={`loading-${!bannerList ? 0 : bannerList.pages[bannerList.pages.length - 1].pageInfo.pageNum}`}
                  className="w-full text-center"
                >
                  loading ...
                </p>
              ),
              hasMore: bannerListHasNextPage,
              loadMore: () => {
                bannerListFetchNextPage();
              },
              useWindow: false,
            }}
          >
            <TableHeaderModule>
              <TableHeaderAtom isFirst width="100px">
                번호
              </TableHeaderAtom>
              <TableHeaderAtom>배너 문구</TableHeaderAtom>
              <TableHeaderAtom width="170px">구분</TableHeaderAtom>
              <TableHeaderAtom>공지사항 제목</TableHeaderAtom>
              <TableHeaderAtom width="170px">공지사항 ID</TableHeaderAtom>
              <TableHeaderAtom width="170px">스타일</TableHeaderAtom>
              <TableHeaderAtom isLast width="130px" />
            </TableHeaderModule>
            <tbody>
              {!bannerList ? (
                bannerListIsLoading ? (
                  <EmptyContainer colSpan={7} text="loading..." />
                ) : (
                  <EmptyContainer colSpan={7} text="error" />
                )
              ) : bannerList.pages[0].pageInfo.totalElements === 0 ? (
                <EmptyContainer colSpan={7} />
              ) : (
                bannerList.pages.flatMap((page, pageIndex) =>
                  page.bannerInfoList.map((banner, index) => (
                    <TableBodyModule key={banner.id}>
                      <TableBodyAtom isFirst>
                        {pageIndex * 10 + index + 1}
                      </TableBodyAtom>
                      <TableBodyAtom>{banner.title}</TableBodyAtom>
                      <TableBodyAtom>
                        {
                          noticeTypeConverter[
                            banner.announcementType as NoticeType
                          ]
                        }
                      </TableBodyAtom>
                      <TableBodyAtom>{banner.announcementTitle}</TableBodyAtom>
                      <TableBodyAtom>{banner.linkUrl}</TableBodyAtom>
                      <TableBodyAtom>
                        <div className="flex items-center justify-center gap-x-2">
                          <div
                            className={`h-4 w-4 rounded-full ${
                              banner.backgroundColor === 'DARK'
                                ? 'bg-sub-300'
                                : banner.backgroundColor === 'LIGHTGRAY'
                                  ? 'bg-sub-100'
                                  : banner.backgroundColor === 'YELLOW'
                                    ? 'bg-primary'
                                    : ''
                            }`}
                          />
                          {banner.backgroundColor}
                        </div>
                      </TableBodyAtom>
                      <TableBodyAtom isLast>
                        <button onClick={() => handleDeleteClick(banner.id)}>
                          <Image src={TrashIcon} alt="trash" />
                        </button>
                      </TableBodyAtom>
                    </TableBodyModule>
                  )),
                )
              )}
            </tbody>
          </TableContainer>
        </div>

        <div className="flex w-full items-center justify-end">
          <ButtonAtom
            type="button"
            buttonStyle="yellow"
            text="배너 추가하기"
            onClick={() => router.push('/admin/notices/banner/new')}
          />
        </div>
      </section>
      {isDeleteModalOpen && (
        <ModalModule
          title="해당 배너를 삭제하시겠습니까?"
          cancelText="취소"
          confirmText="삭제"
          confirmButtonStyle="red"
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setSelectedBannerId(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
};

export default AdminBannerListPage;
