import React, { memo, useEffect, useState } from 'react';
import SelectQuantity from '../../components/common/SelectQuantity';
import { formatMoney } from '../../utils/helper';
import { updateCart } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';

const OrderItem = ({ color, dfQuantity = 1, price, title, thumbnail, pid }) => {
  const [quantity, setQuantity] = useState(() => dfQuantity);
  const dispatch = useDispatch();
  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };
  const handleChangeQuantity = (flag) => {
    if (flag.trim() === ' minus' && quantity === 1) return;
    if (flag.trim() === 'minus') setQuantity((prev) => +prev - 1);
    if (flag.trim() === 'plus') setQuantity((prev) => +prev + 1);
  };
  useEffect(() => {
    dispatch(updateCart({ pid, quantity, color }));
  }, [quantity]);
  return (
    <div className="w-main mx-auto font-bold grid grid-cols-10  py-3 border-b select-none">
      <span className="col-span-6 w-full text-center">
        <div className="flex gap-2 px-4  py-2">
          <img src={thumbnail} className="w-28 h-28 object-cover" alt="thumbnail" />
          <div className="flex flex-col items-starts gap-1">
            <span className="text-main">{title}</span>
            <span className="text-xs font-main">{color}</span>
          </div>
        </div>
      </span>
      <span className="col-span-1 w-full text-center">
        <div className="flex items-center h-full">
          <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
        </div>
      </span>
      <span className="col-span-3 w-full h-full flex items-center text-center justify-center">
        <span className="text-lg">{formatMoney(price * quantity) + ' VND'}</span>
      </span>
    </div>
  );
};

export default memo(OrderItem);
