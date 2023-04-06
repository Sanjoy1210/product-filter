/* eslint-disable react-hooks/exhaustive-deps */
import RangeInput from '@/components/reusable/RangeInput';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SliderPriceInput from './SliderPriceInput';

const PriceRange = ({ min, max, price, setPrice, showModal }) => {
  const [value, setValue] = useState(price);
  const thumbWidth = 16;
  const timeout = useRef(null);
  const router = useRouter();

  // if router.isReady false, price not set properly
  useEffect(() => {
    setValue(() => price);
  }, [price]);

  const onSliderChange = (val) => {
    clearTimeout(timeout.current);
    if (val[0] > val[1]) {
      let temp = val[1];
      val[1] = val[0];
      val[0] = temp;
    }
    setValue(() => val);
    timeout.current = setTimeout(() => {
      setPrice(() => val);
    }, 500);
  };

  useEffect(() => {
    if (price[0] > 0 || price[1] < 5000) {
      router.query['price'] = price.toString();
      if (!showModal) {
        router.push({
          query: router.query,
        });
      }
    }
  }, [price]);
  console.log({ showModal });

  return (
    <>
      <p className="font-medium pb-2">Price</p>
      <div className="range-slider w-full relative mb-4">
        <RangeInput
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onSliderChange([+e.target.value, value[1]])}
        />
        <RangeInput
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onSliderChange([value[0], +e.target.value])}
        />
        <div
          style={{
            position: 'absolute',
            top: '1.3px',
            left: `calc(${(value[0] / max) * 100}% + ${
              (thumbWidth / 2 / max) * 100
            }%)`,
            width: `calc(${((value[1] - value[0]) / max) * 100}% - ${
              (thumbWidth / 2 / max) * 100
            }%)`,
            height: '4px',
            borderRadius: '4px',
            backgroundColor: '#F9C347',
            zIndex: 0,
          }}
        />
      </div>
      <div className="mb-4 flex justify-between mt-6">
        <SliderPriceInput
          value={value[0]}
          min={min}
          max={max}
          title="MIN"
          onChange={(e) => onSliderChange([+e.target.value, value[1]])}
        />
        <SliderPriceInput
          value={value[1]}
          min={min}
          max={max}
          title="MAX"
          onChange={(e) => onSliderChange([value[0], +e.target.value])}
        />
      </div>
    </>
  );
};

export default PriceRange;
