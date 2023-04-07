/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FilterContainer from './FilterContainer';
import FilterModal from './FilterModal';

const Search = () => {
  const MIN_PRICE = 0;
  const MAX_PRICE = 5000;
  const MIN_MILE = 0;
  const MAX_MILE = 500;
  const router = useRouter();
  const query = router.query;
  const queryPrice = query?.['price']
    ?.split(',')
    ?.map((pr) => parseInt(pr, 10));
  const [price, setPrice] = useState(queryPrice || [MIN_PRICE, MAX_PRICE]);
  const [mile, setMile] = useState(MIN_MILE);
  const [isClear, setIsClear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const queryObj = {};
  //   if (mile > 0) {
  //     queryObj['mile'] = mile;
  //   }
  //   if (price[0] > 0 || price[1] < 1000) {
  //     queryObj['price'] = price;
  //   }
  //   if (!showModal) {
  //     router.push({
  //       query: { ...router.query, ...queryObj },
  //     });
  //   }
  // }, [mile, price, showModal]);

  // if isClear true, then delete all the query property using loop and push it again empty object
  // this will do in filter container
  useEffect(() => {
    if (isClear) {
      delete router.query['price'];
      router.push({
        query: router.query,
      });
      setPrice(() => [MIN_PRICE, MAX_PRICE]);
      setIsClear((prev) => !prev);
    } else {
      if (router.isReady) {
        if (queryPrice !== undefined) {
          setPrice(() => queryPrice);
        }
      }
    }
  }, [isClear, router.isReady]);

  const handleClear = () => {
    setIsClear((prev) => true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="hidden md:col-span-3 md:block">
            <div className="flex justify-between items-center border-b border-b-gray-300 pb-2">
              <h1>Filter</h1>
              <button
                className="text-sm py-1 bg-primary px-5 rounded"
                onClick={handleClear}
              >
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
              showModal={showModal}
            />
          </div>
          <div className="md:hidden">
            <button onClick={() => setShowModal((prev) => !prev)}>
              Show Modal
            </button>
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
        handleClear={handleClear}
      />
    </section>
  );
};

export default Search;
