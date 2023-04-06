import RangeInput from '@/components/reusable/RangeInput';
import { useRef, useState } from 'react';

const MileRange = ({ min, max, mile, setMile }) => {
  const [value, setValue] = useState(mile);
  const [tooltipValue, setTooltipValue] = useState(0);
  const [thumbPosition, setThumbPosition] = useState(null);
  const timeout = useRef(null);

  const onSliderChange = (e) => {
    clearTimeout(timeout.current);
    setValue(() => +e.target.value);
    setTooltipValue(() => +e.target.value);
    setThumbPosition(e.target);
    timeout.current = setTimeout(() => {
      setMile(() => +e.target.value);
    }, 500);
  };

  const handleTooltipPosition = () => {
    if (thumbPosition === null) {
      return '0px';
    }
    const rangeWidth = thumbPosition.getBoundingClientRect().width - 20; // 20px is the width of the tooltip
    const position = ((value - min) / (max - min)) * rangeWidth;
    const thumbOffset = 10; // 10px is half the width of the thumb
    const tooltipOffset = 10; // 10px is half the width of the tooltip

    return `calc(${position}px + ${thumbOffset}px - ${tooltipOffset}px)`;
  };

  return (
    <>
      <p className="font-medium pb-10">Mile Range</p>
      <div className="range-slider w-full relative mb-4">
        <RangeInput
          min={min}
          max={max}
          value={value}
          onChange={(e) => onSliderChange(e)}
        />

        <div
          style={{
            position: 'absolute',
            top: '1.1px',
            left: value === max ? '-1px' : '1px',
            width: `calc(${(value / max) * 100}%)`,
            height: '4px',
            borderRadius: '4px',
            backgroundColor: '#F9C347',
            zIndex: 0,
          }}
        />
        <div
          className="absolute z-10 px-1 -top-9 left-0 py-1 text-xs bg-primary rounded"
          style={{ left: handleTooltipPosition() }}
        >
          {tooltipValue}
        </div>
      </div>
    </>
  );
};

export default MileRange;
