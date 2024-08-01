'use client';

import { useState } from 'react';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import { useRouter } from 'next/navigation';
import PlaceListButton from '@/_components/admin/workation/placeListButton';
import { useGetWkPlaceListQuery } from '@/_hooks/admin/useGetWkPlaceListQuery';

const AdminWorkationPlaceListPage = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetWkPlaceListQuery({
    pageParam: {
      page: currentPage,
      size: 10,
      // sort: param.order,
    },
  });
  return (
    <section>
      {!data ? (
        isError ? (
          <EmptyContainer text="no data" notTable />
        ) : (
          <EmptyContainer text="loading" notTable />
        )
      ) : data.pageInfo.totalElements <= 0 ? (
        <EmptyContainer notTable />
      ) : (
        data.wktPlaceInfos.map((item) => (
          <div className="flex flex-col gap-2.5" key={item.id}>
            <PlaceListButton
              image={item.thumbnailUrl}
              data={[
                { subtitle: '이름', content: item.place },
                { subtitle: '장소', content: item.address },
                { subtitle: '등록 일시', content: item.createdAt.toString() },
                { subtitle: '최대 인원', content: item.maxPeople.toString() },
                { subtitle: '설명', content: item.description },
              ]}
              domain={`/admin/workation/place/${item.id}`}
            />
          </div>
        ))
      )}
      <div className="relative mt-8">
        <div className="flex justify-center">
          {data && (
            <PaginationModule
              totalPages={data.pageInfo.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        <div className="absolute right-0 top-0">
          <ButtonAtom
            onClick={() => {
              router.push('/admin/workation/place/new');
            }}
            text="장소 추가"
            buttonStyle="yellow"
            type="button"
          />
        </div>
      </div>
    </section>
  );
};

export default AdminWorkationPlaceListPage;
