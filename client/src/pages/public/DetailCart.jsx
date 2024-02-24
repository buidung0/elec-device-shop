import { Button, OrderItem } from '../../components';
import React from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { formatMoney } from '../../utils/helper';
import path from '../../utils/path';
import Swal from 'sweetalert2';

const DetailCart = () => {
  const { currentCart, current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmmit = () => {
    if (!current.address)
      return Swal.fire({
        icon: 'info',
        title: 'Almost',
        text: 'Please Update ur Address before Check Out',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Go Update',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed)
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({ redirect: location.pathname }).toString(),
          });
      });
    else {
      window.open(`/${path.CHECK_OUT}`, '_blank');
    }
  };

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-bold text-3xl">My Cart</h3>
          {/* <BreadCrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} /> */}
        </div>
      </div>
      <div className="flex flex-col mt-8 border w-main mx-auto my-8">
        <div className="w-main mx-auto font-bold grid grid-cols-10 py-3 bg-gray-200 ">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>
        {currentCart?.map((el) => (
          <OrderItem key={el._id} dfQuantity={el?.quantity} color={el?.color} title={el?.title} thumbnail={el?.thumbnail} price={el?.price} pid={el?.product?._id} />
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12">
        <span className=" flex items-center gap-8 text-sm">
          <span>Subtotal: </span>
          <span className=" text-main font-bold">{`${formatMoney(currentCart?.reduce((sum, el) => el?.price * el.quantity + sum, 0))} VND`}</span>
        </span>
        <span className="text-xs italic">Shipping, taxes, and discounts calculated at checkout</span>
        <Button handleOnClick={handleSubmmit}>CHECK OUT</Button>
        {/* <Link target="_blank" to={`/${path.CHECK_OUT}`} className=" bg-main py-2 px-4 rounded-md text-white">
          Check Out
        </Link> */}
      </div>
    </div>
  );
};

export default DetailCart;
