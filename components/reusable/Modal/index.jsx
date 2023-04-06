import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({
  isOpen = false,
  onClose = () => null,
  isOverflowY = true,
  isTransparentBG = false,
  rounded = 2,
  children,
}) => {
  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };

  const closeModal = (e) => {
    if (typeof onClose === 'function') {
      // For using this function, you can close the modal only using "data-close" attribute in anywhere as the child of the modal
      if ('close' in e?.target?.dataset) {
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // main container
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={(e) => closeModal(e)}
          transition={{ duration: 0.1 }}
          className="fixed top-0 left-0 z-[1500] flex h-screen w-screen items-center justify-center "
        >
          {/* mask on the modal */}
          <motion.div
            data-close
            className="absolute z-[1499] h-full w-full bg-gray-900 opacity-30"
          />
          {/* content container */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
            id="modalContainer"
            style={{ borderRadius: rounded + 'px' }}
            className={`relative z-[1501] h-auto max-h-[95vh] min-h-[100px] w-auto min-w-[300px] max-w-[95vw] overflow-x-hidden ${
              isOverflowY ? 'overflow-y-auto' : ' overflow-y-hidden'
            } ${isTransparentBG ? 'bg-transparent' : 'bg-white'}`}
          >
            {/* You have to control this modal width form the child elements */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
