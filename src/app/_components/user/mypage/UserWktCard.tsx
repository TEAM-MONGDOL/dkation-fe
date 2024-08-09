import React, { useState } from 'react';
import Image from 'next/image';
import { PointEditIcon } from '@/_assets/icons';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import UserTextLabelAtom from '@/_components/user/common/atoms/UserTextLabelAtom';
import UserModalAtom from '@/_components/user/common/atoms/UserModalAtom';
import UserModalTextAtom from '@/_components/user/common/atoms/UserModalTextAtom';
import { StatusConfig } from '@/_constants/common';
import { StatusType } from '@/_types/adminType';

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
  applyStatusType: StatusType;
  waitingNumber?: number;
  onClick?: (applyStatusType: WorkationCardProps['applyStatusType']) => void;
}

const WorkationCard: React.FC<WorkationCardProps> = ({
  thumbnailUrl,
  place,
  wktName,
  totalRecruit,
  applyStartDate,
  applyEndDate,
  startDate,
  endDate,
  bettingPoint: initialBettingPoint,
  applyStatusType,
  waitingNumber = -1,
  onClick,
}) => {
  const { textLabel, buttonText, textLabelClass, buttonStyle, buttonDisabled } =
    StatusConfig[applyStatusType];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBettingPoint, setCurrentBettingPoint] =
    useState(initialBettingPoint);
  const [newBettingPoint, setNewBettingPoint] = useState('');
  const [showProbability, setShowProbability] = useState(false);
  const [probability, setProbability] = useState<number | null>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowProbability(false);
    setNewBettingPoint('');
  };

  const handleBettingPointChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewBettingPoint(event.target.value);
  };

  const calculateProbability = (point: number): number => {
    // 확률 계산 post 요청
    return point;
  };

  const handleShowProbability = () => {
    /* const point = Number(newBettingPoint);
    if (!Number.isNaN(point) && point >= 0) {
      setProbability(point);
      setShowProbability(true);
    } else {
      setProbability(null);
      setShowProbability(false);
    }
     */
  };

  const handleSaveBettingPoint = () => {
    const point = Number(newBettingPoint);
    // 베팅 포인트 수정 로직 추가 예정
    setCurrentBettingPoint(point);
    console.log('new betting point:', point);
    handleModalClose();
  };

  return (
    <div className="flex w-full p-4">
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
              베팅 포인트 : {currentBettingPoint} 점
            </p>
            {applyStatusType === 'APPLIED' && (
              <button onClick={() => setIsModalOpen(true)}>
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

      {isModalOpen && (
        <UserModalAtom>
          <UserModalTextAtom className="text-h3 font-semibold">
            나의 당첨 확률 확인하기
          </UserModalTextAtom>
          <div className="mb-4">
            {showProbability && probability !== null && (
              <div>
                <div className="flex items-end justify-between px-20">
                  <p className="text-[78px] font-bold">
                    {probability.toFixed(2)}%
                  </p>
                  <p className="mb-4 text-sub-200">± N%</p>
                </div>
                <div className="w-full border-b border-stroke-100" />
              </div>
            )}
            <div className="flex flex-col justify-center gap-y-2 pt-6">
              <div className="flex items-center justify-center gap-x-4">
                <p className="w-[100px] text-end text-2">내 포인트</p>
                <input
                  type="number"
                  value={currentBettingPoint}
                  readOnly
                  onChange={handleBettingPointChange}
                  className="h-12 w-52 rounded border border-sub-100/50 px-3 text-end focus:outline-none"
                  placeholder="새로운 포인트 입력"
                  min="0"
                />
              </div>
              <div className="flex items-center justify-center gap-x-4">
                <p className="w-[100px] text-end text-2">베팅할 포인트</p>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={newBettingPoint}
                    onChange={handleBettingPointChange}
                    className="h-12 w-52 rounded border border-sub-100/50 px-3 pr-20 text-end focus:outline-none"
                    min="0"
                  />
                  <UserButtonAtom
                    text="확인"
                    buttonStyle="white"
                    type="submit"
                    onClick={handleShowProbability}
                    className="absolute right-1.5 top-1.5 rounded border border-sub-100 px-4 py-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 pt-6">
            <UserButtonAtom
              text="취소"
              size="md"
              buttonStyle="white"
              type="button"
              onClick={handleModalClose}
              className="rounded-md"
            />
            <UserButtonAtom
              text="수정"
              size="md"
              buttonStyle="yellow"
              type="submit"
              onClick={handleSaveBettingPoint}
              className="rounded-md"
            />
          </div>
        </UserModalAtom>
      )}
    </div>
  );
};

export default WorkationCard;
