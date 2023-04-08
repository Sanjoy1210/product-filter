import Modal from '@/components/reusable/Modal';
import { useRouter } from 'next/router';
import { GrClose } from 'react-icons/gr';
import FilterContainer from '../FilterContainer';

const FilterModal = ({
  showModal,
  setShowModal,
  MIN_MILE,
  MAX_MILE,
  mile,
  setMile,
  MIN_PRICE,
  MAX_PRICE,
  price,
  setPrice,
  handleClear,
  categories,
  setCategories,
}) => {
  const router = useRouter();
  const handleClose = () => {
    setShowModal((prev) => !prev);
  };
  const handleFilter = () => {
    handleClose();
    router.push({
      query: router.query,
    });
  };
  return (
    <Modal
      isOpen={showModal}
      isOverflowY={false}
      rounded={6}
      onClose={handleClose}
      isTransparentBG={false}
    >
      <div className="z-[700] border-b bg-white p-4 py-3 text-dark relative">
        <button
          className="px-3 text-lg text-zinc-900 absolute top-4"
          onClick={handleClose}
          type="button"
        >
          <span className="">
            <GrClose />
          </span>
        </button>
        <h1 className=" text-gray-700 smd:text-xl text-center">Filters</h1>
      </div>
      {/*content*/}
      <div className="sidebar max-h-[75vh] xs:w-[350px] smd:w-[420px] pb-0">
        <div className=" px-6 smd:px-10 pt-4">
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
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      </div>
      <div className="sticky bottom-0 flex justify-between border-t bg-white py-2 pr-3">
        <div className="px-4 py-1">
          <button
            className="text-sm py-1 bg-primary px-5 rounded"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        <button
          type="submit"
          className="rounded bg-black px-5 py-2 text-sm font-semibold text-white"
          onClick={handleFilter}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default FilterModal;
