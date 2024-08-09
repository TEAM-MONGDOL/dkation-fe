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

const AdminPointsRewardNewPage = () => {
  const router = useRouter();

  const {
    data: bannerList,
    fetchNextPage: bannerListFetchNextPage,
    hasNextPage: bannerListHasNextPage,
    isLoading: bannerListIsLoading,
  } = useGetBannerListInfiniteQuery({
    pageable: { page: 1, size: 10 },
  });

  return (
    <section className="flex h-full w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="배너 목록" />
      <section className="flex w-full flex-col gap-y-[60px]">
        <div className="flex w-full flex-1 gap-x-5">
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
                <TableHeaderAtom>링크</TableHeaderAtom>
                <TableHeaderAtom width="200px">배경색</TableHeaderAtom>
                <TableHeaderAtom isLast width="130px" />
              </TableHeaderModule>
              <tbody>
                {!bannerList ? (
                  bannerListIsLoading ? (
                    <EmptyContainer colSpan={4} text="loading..." />
                  ) : (
                    <EmptyContainer colSpan={4} text="error" />
                  )
                ) : bannerList.pages[0].pageInfo.totalElements === 0 ? (
                  <EmptyContainer colSpan={4} />
                ) : (
                  bannerList.pages.map((page) =>
                    page.bannerInfoList.map((banner) => (
                      <TableBodyModule key={banner.id}>
                        <TableBodyAtom isFirst>{banner.id}</TableBodyAtom>
                        <TableBodyAtom>{banner.title}</TableBodyAtom>
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
                          <button>
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
    </section>
  );
};

export default AdminPointsRewardNewPage;
