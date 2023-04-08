const RangeInput = ({ min, max, value, thumbRef = null, ...restProps }) => {
  return (
    <input
      min={min}
      max={max}
      value={value}
      type="range"
      ref={thumbRef}
      {...restProps}
      className="border border-white w-full absolute left-0 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-runnable-track]:bg-[#ddd] [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:border-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[1] focus:outline-none focus:[&::-webkit-slider-runnable-track]:bg-[#ccc]"
    />
  );
};

export default RangeInput;

// [&::-moz-range-track]:w-full [&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-[#ddd] [&::-moz-range-track]:border-none [&::-moz-range-track]:rounded [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#21c1ff] [&::-ms-track]:w-full [&::-ms-track]:h-1 [&::-ms-track]:bg-transparent [&::-ms-track]:border-transparent [&::-ms-track]:border-1.5
