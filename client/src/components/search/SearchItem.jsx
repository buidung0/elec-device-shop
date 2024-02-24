import React, { memo, useEffect, useState } from 'react';
import icons from '../../utils/icons';
import { colors } from '../../utils/constant';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiGetProduct } from '../../apis';
import useDebounce from '../../hooks/useDebounce';

const { AiOutlineDown } = icons;
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [params] = useSearchParams();
  const [price, setPrice] = useState({ from: '', to: '' });
  const navigate = useNavigate();
  const { category } = useParams();
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl) setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const fetchBestPriceProduct = async () => {
    const response = await apiGetProduct({ sort: '-price', limit: 1 });
    if (response.success) setBestPrice(response.products[0]?.price);
  };
  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];

    if (selected.length > 0) {
      queries.color = selected.join(',');
      queries.page = 1;
    } else delete queries.color;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];
    if (Number(price.from) > 0) queries.from = price.from;
    else delete queries.from;
    if (Number(price.to) > 0) queries.to = price.to;
    else delete queries.to;
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);

  useEffect(() => {
    if (type === 'input') fetchBestPriceProduct();
  }, [type]);

  useEffect(() => {
    if (price.from && price.to && price.from > price.to) alert('Price "From" must be less than "To"');
  }, [price]);

  return (
    <div
      className="p-3 cursor-pointer text-xs border border-gray-800 flex justify-between items-center relative gap-6 text-gray-500"
      onClick={() => changeActiveFilter(name)}
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]">
          {type === 'checkbox' && (
            <div className="">
              <div className="py-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                    changeActiveFilter(null);
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4 ">
                    <input
                      type="checkbox"
                      name={el}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 outline-none"
                      value={el}
                      id={el}
                      onChange={handleSelect}
                      checked={selected.some((selectedItem) => selectedItem === el)}
                    />
                    <label htmlFor={el} className="capitalize text-gray-700">
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === 'input' && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="py-4 items-center flex justify-between gap-8 border-b" onClick={(e) => e.stopPropagation()}>
                <span className="whitespace-nowrap">{`The highest price is ${Number(bestPrice).toLocaleString()} VND`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: '', to: '' });
                    changeActiveFilter(null);
                  }}
                  className="underline cursor-pointer hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input type="number" className="form-input" id="from" value={price.from} onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))} />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input type="number" className="form-input" id="to" value={price.to} onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
