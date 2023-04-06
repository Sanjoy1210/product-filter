/* eslint-disable react-hooks/exhaustive-deps */
import CategoryFilter from '../CategoryFilter';
import MileRange from '../MileRange';
import PriceRange from '../PriceRange';

const FilterContainer = ({
  MIN_MILE,
  MAX_MILE,
  mile,
  setMile,
  MIN_PRICE,
  MAX_PRICE,
  price,
  setPrice,
}) => {
  // const MIN_PRICE = 0;
  // const MAX_PRICE = 5000;
  // const MIN_MILE = 0;
  // const MAX_MILE = 500;
  // const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
  // const [mile, setMile] = useState(MIN_MILE);
  // const router = useRouter();
  // console.log({ router });

  // useEffect(() => {
  //   if (mile > 0) {
  //     router.query['mile'] = mile;
  //   }
  //   if (price[0] > 0 || price[1] < 1000) {
  //     router.query['price'] = price;
  //   }
  //   router.push({
  //     query: router.query,
  //   });
  // }, [mile, price]);

  return (
    <div>
      <MileRange min={MIN_MILE} max={MAX_MILE} mile={mile} setMile={setMile} />
      <PriceRange
        min={MIN_PRICE}
        max={MAX_PRICE}
        price={price}
        setPrice={setPrice}
      />
      <CategoryFilter />
    </div>
  );
};

export default FilterContainer;
