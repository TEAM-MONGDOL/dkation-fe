'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface RangeAtomProps {
  min: number;
  max: number;
  step?: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
  suffix?: string;
}

const RangeAtom = ({
  min,
  max,
  step = 1,
  onChange,
  suffix,
}: RangeAtomProps) => {
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
  }, [minVal, maxVal]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-1.5">
      <div className="relative my-2.5 h-1 w-full rounded-full bg-cus-100">
        <div className="absolute bottom-0 top-0 bg-primary" ref={rangeRef} />
        <input
          className="thumb pointer-events-none absolute bottom-0 left-0 top-0 w-full bg-transparent"
          type="range"
          min={min}
          max={max}
          value={minVal}
          step={step}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal);
            setMinVal(value);
            minValRef.current = value;
          }}
        />
        <input
          className="thumb pointer-events-none absolute bottom-0 left-0 top-0 w-full bg-transparent"
          type="range"
          min={min}
          max={max}
          value={maxVal}
          step={step}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal);
            setMaxVal(value);
            maxValRef.current = value;
          }}
        />
      </div>
      <div className="flex w-full items-center justify-between text-4 text-sub-200">
        <span className="text-start">{`${minVal} ${suffix || ''}`}</span>
        <span className="text-end">{`${maxVal} ${suffix || ''}`}</span>
      </div>
    </div>
  );
};

export default RangeAtom;
