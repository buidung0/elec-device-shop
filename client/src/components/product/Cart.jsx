import Button from '../../components/buttons/Button';
import React, { memo } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { showCart } from '../../store/app/appSlice';
import { formatMoney } from '../../utils/helper';
import { ImBin } from 'react-icons/im';
import { apiRemoveCart } from '../../apis';
import { getCurrent } from '../../store/user/asyncAction';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';

const Cart = () => {
  const { currentCart } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) dispatch(getCurrent());
  };

  return (
    <div className="w-[400px] h-screen bg-black text-white px-6 grid grid-rows-10 select-none" onClick={(e) => e.stopPropagation()}>
      <header className=" border-b border-gray-500 flex justify-between items-center font-bold text-2xl row-span-1 h-full">
        <span>Your Cart</span>
        <span className="p-2 cursor-pointer" onClick={() => dispatch(showCart())}>
          <IoClose size={24} />
        </span>
      </header>
      <section className=" row-span-7 h-full max-h-full overflow-y-auto gap-3 py-3">
        {!currentCart && <span className="text-xs italic">Your Cart Is Empty</span>}
        {currentCart &&
          currentCart.map((el) => (
            <div key={el._id} className="flex justify-between items-center bg-gray-900 p-2 rounded mb-2">
              <div className="flex gap-2">
                <img src={el.product?.thumb} className="w-[70px] h-[85px] object-cover rounded" />
                <div className="flex flex-col gap-1">
                  <span className="text-main">{el?.title}</span>
                  <span className="text-xs">{el.color}</span>
                  <span className="text-xs">{`Quantity:  ${el.quantity}`}</span>
                  <span className="text-base">{formatMoney(el?.price) + ' VND'}</span>
                </div>
              </div>
              <span
                className="h-8 w-8 flex items-center justify-center  rounded-full hover:bg-red-600 cursor-pointer"
                onClick={() => removeCart(el.product?._id, el.color)}
              >
                <ImBin size={16} />
              </span>
            </div>
          ))}
      </section>
      <div className=" row-span-2 h-full flex flex-col justify-between py-2">
        <div className="flex items-center justify-between pt-4 border-t">
          <span>Subtotal:</span>
          <span className="text-base">{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el.price) * el.quantity, 0)) + ' VND'}</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-center text-gray-400 italic text-[15px]">Shipping, taxes, and discounts calculated at checkout.</span>
        </div>
        <Button
          style="rounded-md w-full bg-main py-3"
          handleOnClick={() => {
            dispatch(showCart());
            navigate(`/${path.MEMBER}/${path.DETAIL_CART}`);
          }}
        >
          Shopping Cart
        </Button>
      </div>
    </div>
  );
};

export default memo(Cart);
