import Modal from '@/components/reusable/Modal';
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
}) => {
  const handleClose = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <Modal
      isOpen={showModal}
      isOverflowY={false}
      rounded={6}
      onClose={handleClose}
      isTransparentBG={false}
    >
      {/*content*/}
      <div className="sidebar max-h-[75vh] pb-0">
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
          />
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
