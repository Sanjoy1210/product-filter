/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoCheckbox } from 'react-icons/io5';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

const SingleCategory = ({
  title = '',
  subCategories = [],
  allCategories = [],
  categoryName = '',
  categories,
  setCategories,
  showModal,
}) => {
  const [firstFilteredCategory, setFirstFilteredCategory] = useState(
    allCategories[0]
  );
  const [showItem, setShowItem] = useState(false);
  const router = useRouter();

  const handleItemExpand = () => {
    if (firstFilteredCategory === categoryName) {
      setFirstFilteredCategory('');
    } else {
      setShowItem((prev) => !prev);
    }
  };

  const handleSetCategories = (tempCategories) => {
    setCategories((prev) => ({
      ...prev,
      [categoryName]: {
        ...prev?.[categoryName],
        subCategories: tempCategories,
      },
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const tempCategories = subCategories?.map((item) =>
      item?.value === name
        ? {
            ...item,
            isChecked: checked,
          }
        : { ...item }
    );

    handleSetCategories(tempCategories);
    // setCategories((prev) => ({
    //   ...prev,
    //   [categoryName]: {
    //     ...prev?.[categoryName],
    //     subCategories: tempCategories,
    //   },
    // }));

    const checkedItems = tempCategories
      ?.filter((item) => item?.isChecked)
      ?.map((item) => item?.value);
    const q = checkedItems.toString();
    // queryString package --> "categoryName=livestock,enclosed,flatbed"
    // const qr = queryString.stringify(
    //   { [categoryName]: checkedItems },
    //   { arrayFormat: 'comma', skipNull: true }
    // );
    // router.push(`/search?` + qr);
    router.query[categoryName] = q;
    if (router.query[categoryName] === '') {
      delete router.query[categoryName];
    }
    if (!showModal) {
      router.push({
        query: router.query,
      });
    }
  };

  useEffect(() => {
    // add isClear later
    if (router.isReady) {
      if (router.query?.[categoryName]?.length > 0) {
        const qr = router.query?.[categoryName];

        const existItems = categories?.[categoryName]?.subCategories?.map(
          (item) =>
            qr.includes(item?.value) ? { ...item, isChecked: true } : item
        );

        handleSetCategories(existItems);
      }
    }
  }, [router.isReady, categoryName, router.query]);

  return (
    <div className="border-b border-b-gray-300 pb-3">
      <div
        className="flex cursor-pointer justify-between items-center pt-4"
        onClick={handleItemExpand}
      >
        <p className="font-medium">{title}</p>
        {/* add animation later */}
        <span className="-mr-1">
          {showItem || firstFilteredCategory === categoryName ? (
            <MdOutlineKeyboardArrowDown className="text-xl" />
          ) : (
            <MdOutlineKeyboardArrowRight className="text-xl" />
          )}
        </span>
      </div>
      <div
        className={`space-y-2 pt-4 ${
          showItem || firstFilteredCategory === categoryName
            ? 'block'
            : 'hidden'
        }`}
      >
        {subCategories?.map((category) => (
          <div
            key={category?.id}
            className="flex items-center cursor-pointer relative"
          >
            <IoCheckbox
              className={`absolute top-1 -left-0.5 h-5 w-5 text-primary 2xl:-left-0.5 ${
                category?.isChecked ? 'block -mt-[3px]' : 'hidden'
              }`}
            />
            <input
              type="checkbox"
              id={category?.id}
              className={`mt-0 inline-block h-4 w-4 shrink-0 cursor-pointer appearance-none overflow-hidden rounded border transition-all duration-300 2xl:mt-0.5 ${
                category?.isChecked ? 'border-0' : `border-primary bg-white`
              }`}
              name={category?.value}
              checked={category?.isChecked || false}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor={category?.id}
              className="ml-2 block text-gray-900 cursor-pointer text-sm"
            >
              {category?.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCategory;
