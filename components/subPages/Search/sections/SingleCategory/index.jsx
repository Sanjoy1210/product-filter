/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

const SingleCategory = ({
  title = '',
  subCategories = [],
  size = 'medium',
  color = 'indigo',
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

  const sizeClass =
    size === 'small' ? 'h-4 w-4' : size === 'medium' ? 'h-5 w-5' : 'h-6 w-6';
  const colorClass = `text-${color}-600`;

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
          <div key={category?.id} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id={category?.id}
              className={`${sizeClass} ${colorClass} rounded border focus:ring-${color}-500 accent-primary border-primary`}
              name={category?.value}
              checked={category?.isChecked || false}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor={category?.id}
              className="ml-2 block text-gray-900 cursor-pointer"
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
