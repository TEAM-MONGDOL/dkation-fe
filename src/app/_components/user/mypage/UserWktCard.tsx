import React from 'react';
import Image from 'next/image';
import { PointEditIcon } from '@/_assets/icons';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import UserTextLabelAtom from '@/_components/user/common/atoms/UserTextLabelAtom';

interface WorkationCardProps {
  thumbnailUrl: string;
  wktName: string;
  place: string;
  totalRecruit: number;
  applyStartDate: string;
  applyEndDate: string;
  startDate: string;
  endDate: string;
  bettingPoint: number;
  applyStatusType:
    | 'APPLIED'
    | 'RAFFLE_WAIT'
    | 'NO_WINNING'
    | 'CONFIRM_WAIT'
    | 'CANCEL'
    | 'CONFIRM'
    | 'WAIT'
    | 'VISITED';
  waitingNumber?: number;
  onClick?: (applyStatusType: WorkationCardProps['applyStatusType']) => void;
}

type ButtonStyle =
  | 'white'
  | 'red'
  | 'black'
  | 'lightGray'
  | 'darkGray'
  | 'yellow';

interface StatusConfig {
  textLabel: string;
  buttonText: string | ((waitingNumber: number) => string);
  textLabelClass: string;
  buttonStyle: ButtonStyle;
  buttonDisabled: boolean;
}

const statusConfig: Record<
  WorkationCardProps['applyStatusType'],
  StatusConfig
> = {
  APPLIED: {
    textLabel: '진행 중',
    buttonText: '신청 취소하기',
    textLabelClass: 'bg-white text-negative border border-negative',
    buttonStyle: 'red',
    buttonDisabled: false,
  },
  RAFFLE_WAIT: {
    textLabel: '추첨 대기',
    buttonText: '신청 취소하기',
    textLabelClass: 'bg-sub-100 text-black border border-sub-100',
    buttonStyle: 'lightGray',
    buttonDisabled: true,
  },
  NO_WINNING: {
    textLabel: '미당첨',
    buttonText: (waitingNumber) =>
      waitingNumber === -1 ? '추첨 완료' : `대기번호 (${waitingNumber})번`,
    textLabelClass: 'border border-negative bg-negative text-white',
    buttonStyle: 'red',
    buttonDisabled: true,
  },
  CONFIRM_WAIT: {
    textLabel: '당첨',
    buttonText: '방문 확정하기',
    textLabelClass: 'bg-primary text-black border border-yellow-button-line',
    buttonStyle: 'yellow',
    buttonDisabled: false,
  },
  CANCEL: {
    textLabel: '방문 포기',
    buttonText: '방문 포기',
    textLabelClass: 'bg-sub-300 text-white border border-sub-300',
    buttonStyle: 'darkGray',
    buttonDisabled: true,
  },
  WAIT: {
    textLabel: '미당첨',
    buttonText: (waitingNumber) => `대기번호 (${waitingNumber})번`,
    textLabelClass: 'border border-negative bg-negative text-white',
    buttonStyle: 'red',
    buttonDisabled: true,
  },
  CONFIRM: {
    textLabel: '방문 확정',
    buttonText: '방문 확정',
    textLabelClass: 'border-gray-500 bg-gray-100 text-gray-500',
    buttonStyle: 'darkGray',
    buttonDisabled: true,
  },
  VISITED: {
    textLabel: '방문 완료',
    buttonText: '후기 작성하기',
    textLabelClass: 'bg-primary text-black border border-yellow-button-line',
    buttonStyle: 'red',
    buttonDisabled: false,
  },
};

const WorkationCard: React.FC<WorkationCardProps> = ({
  thumbnailUrl,
  place,
  wktName,
  totalRecruit,
  applyStartDate,
  applyEndDate,
  startDate,
  endDate,
  bettingPoint,
  applyStatusType,
  waitingNumber = -1,
  onClick,
}) => {
  const { textLabel, buttonText, textLabelClass, buttonStyle, buttonDisabled } =
    statusConfig[applyStatusType];

  return (
    <div className="flex w-full rounded-lg border border-gray-200 bg-sky-50 p-4">
      <Image
        width={402}
        height={304}
        src={thumbnailUrl}
        alt="place"
        className="rounded object-cover"
      />
      <div className="ml-8 flex-grow">
        <p className="mb-3 text-sub-300">{wktName}</p>
        <h2 className="mb-20 text-h2 font-semibold text-sub-400">{place}</h2>
        <div className="flex items-end justify-between">
          <div className="mb-4">
            <p className="mb-1">모집 인원 : {totalRecruit}명</p>
            <p className="mb-1">
              모집 기간 : {applyStartDate} - {applyEndDate}
            </p>
            <p>
              워케이션 기간 : {startDate} - {endDate}
            </p>
          </div>
          <div className="mb-4 flex items-center gap-x-2">
            <p className="flex items-center rounded-full bg-sub-100/40 px-5 py-2.5">
              베팅 포인트 : {bettingPoint} 점
            </p>
            {applyStatusType === 'APPLIED' && onClick && (
              <button onClick={() => onClick(applyStatusType)}>
                <Image src={PointEditIcon} alt="edit" />
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <UserTextLabelAtom
            text={textLabel}
            size="sm"
            className={textLabelClass}
          />
          <UserButtonAtom
            text={
              typeof buttonText === 'function'
                ? buttonText(waitingNumber)
                : buttonText
            }
            size="sm"
            buttonStyle={buttonStyle}
            type="button"
            className="rounded-md"
            disabled={buttonDisabled}
            onClick={
              !buttonDisabled && onClick
                ? () => onClick(applyStatusType)
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WorkationCard;
