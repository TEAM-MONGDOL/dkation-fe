import { StarRateEmptyIcon, StarRateIcon } from '@/_assets/icons';
import { ReviewType } from '@/_types/adminType';
import { dateConverter } from '@/_types/converter';
import Image from 'next/image';

interface RecentReviewItemProps {
  review: ReviewType;
}

const RecentReviewItem = ({ review }: RecentReviewItemProps) => {
  return (
    <div className="flex h-[307px] w-[331px] shrink-0 flex-col rounded-xl border border-sub-100 text-sub-400">
      <div className="border-b border-sub-100 px-7 py-6">
        <div className="flex w-full items-center justify-between">
          <p className="text-4 font-medium text-sub-200">{review.wktPlace}</p>
          <div className="flex items-center">
            {Array.from({ length: review.rating }, (_, idx) => (
              <Image
                key={idx}
                src={StarRateIcon}
                alt="star"
                className="h-6 w-6"
              />
            ))}
            {Array.from({ length: 5 - review.rating }, (_, idx) => (
              <Image
                key={idx}
                src={StarRateEmptyIcon}
                alt="star"
                className="h-6 w-6"
              />
            ))}
          </div>
        </div>
        <h3 className="mt-4 text-h3 font-semibold">{review.reviewer}</h3>
      </div>
      <div className="flex w-full grow flex-col justify-between px-7 pb-7 pt-5">
        <p className="font-medium">{review.blindedType}</p>
        <p className="w-full text-end text-4 text-sub-300">
          {dateConverter(review.lastModifiedAt)}
        </p>
      </div>
    </div>
  );
};

export default RecentReviewItem;
