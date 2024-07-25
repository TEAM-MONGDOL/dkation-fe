'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface RangeAtomProps {
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
  suffix?: string;
}

const RangeAtom = ({ min, max, onChange, suffix }: RangeAtomProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-1.5">
      <div className="w-full rounded-full bg-cus-100 h-1 relative my-2.5">
        <div className="absolute top-0 bottom-0 bg-primary" ref={rangeRef} />
        <input
          className="thumb absolute left-0 w-full top-0 bottom-0 bg-transparent pointer-events-none"
          type="range"
          min={min}
          max={max}
          value={minVal}
          step="1"
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal);
            setMinVal(value);
            minValRef.current = value;
          }}
        />
        <input
          className="thumb absolute left-0 w-full top-0 bottom-0 bg-transparent pointer-events-none"
          type="range"
          min={min}
          max={max}
          value={maxVal}
          step="1"
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal);
            setMaxVal(value);
            maxValRef.current = value;
          }}
        />
      </div>
      <div className="w-full flex items-center justify-between text-4 text-sub-200">
        <span className="text-start">{`${minVal} ${suffix || ''}`}</span>
        <span className="text-end">{`${maxVal} ${suffix || ''}`}</span>
      </div>
    </div>
  );
};

export default RangeAtom;
