const SliderPriceInput = ({ value, min, max, title, ...props }) => {
  return (
    <div className="range-input">
      <input
        value={value}
        min={min}
        max={max}
        type="number"
        {...props}
        className="slider border border-secondary text-center focus:outline-none"
      />
      <p className="text-center text-sm pt-1">{title}</p>
    </div>
  );
};

export default SliderPriceInput;
