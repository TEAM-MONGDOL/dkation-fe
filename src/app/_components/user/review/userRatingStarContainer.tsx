import React, { useState } from 'react';
import Image from 'next/image';
import { ClickedStarIcon, UnclickedStarIcon } from '@/_assets/icons';
import { ReviewInfo } from '@/_constants/common';

interface RatingStarProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RatingStar = ({
  rating: initialRating,
  onRatingChange,
}: RatingStarProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [currentRating, setCurrentRating] = useState<number>(initialRating);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMouseEnter = (value: number) => {
    if (!isDragging) {
      setHoveredRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setHoveredRating(0);
    }
  };

  const handleClick = (value: number) => {
    setCurrentRating(value);
    onRatingChange(value);
  };

  const handleMouseDown = (value: number) => {
    setIsDragging(true);
    setCurrentRating(value);
    onRatingChange(value);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setHoveredRating(0);
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isDragging) {
      const element = event.currentTarget;
      const { left, width } = element.getBoundingClientRect();
      const clickPosition = event.clientX - left;
      const newRating = Math.ceil((clickPosition / width) * 5);
      setHoveredRating(newRating);
      setCurrentRating(newRating);
      onRatingChange(newRating);
    }
  };

  const getFeedbackText = (rating: number) => {
    return (ReviewInfo as { [key: number]: string })[rating] || '';
  };

  return (
    <div className="flex flex-col items-center">
      <div
        role="presentation"
        className="flex"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const value = index + 1;
          const isClicked = value <= currentRating;
          const isHovered = value <= hoveredRating;

          return (
            <div
              role="presentation"
              key={value}
              className="cursor-pointer"
              onMouseEnter={() => handleMouseEnter(value)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={() => handleMouseDown(value)}
              onClick={() => handleClick(value)}
            >
              {isHovered || isClicked ? (
                <Image src={ClickedStarIcon} alt="" />
              ) : (
                <Image src={UnclickedStarIcon} alt="" />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-h3 font-semibold text-sub-400">
        {getFeedbackText(currentRating)}
      </p>
    </div>
  );
};

export default RatingStar;
