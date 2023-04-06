/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FilterContainer from './FilterContainer';
import FilterModal from './FilterModal';

const Search = () => {
  const [showModal, setShowModal] = useState(false);
  const MIN_PRICE = 0;
  const MAX_PRICE = 5000;
  const MIN_MILE = 0;
  const MAX_MILE = 500;
  const router = useRouter();
  const query = router.query;
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
  const [mile, setMile] = useState(MIN_MILE);

  useEffect(() => {
    if (mile > 0) {
      router.query['mile'] = mile;
    }
    if (price[0] > 0 || price[1] < 1000) {
      router.query['price'] = price;
    }
    if (!showModal) {
      router.push({
        query: router.query,
      });
    }
  }, [mile, price]);

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="hidden md:col-span-3 md:block">
            <div className="flex justify-between items-center">
              <h1>Filter</h1>
              <button className="text-sm py-1 bg-primary px-5 rounded">
                Clear
              </button>
            </div>
            {/* filter options */}
            <FilterContainer
              MIN_MILE={MIN_MILE}
              MAX_MILE={MAX_MILE}
              mile={mile}
              setMile={setMile}
              MIN_PRICE={MIN_PRICE}
              MAX_PRICE={MAX_PRICE}
              price={price}
              setPrice={setPrice}
            />
          </div>
          <div className="md:hidden">
            <button onClick={() => setShowModal(() => true)}>Show Modal</button>
          </div>
          <div className="md:col-span-9">Product</div>
        </div>
      </div>
      <FilterModal
        showModal={showModal}
        setShowModal={setShowModal}
        MIN_MILE={MIN_MILE}
        MAX_MILE={MAX_MILE}
        mile={mile}
        setMile={setMile}
        MIN_PRICE={MIN_PRICE}
        MAX_PRICE={MAX_PRICE}
        price={price}
        setPrice={setPrice}
      />
    </section>
  );
};

export default Search;
