import React, { useEffect, useState } from 'react';
import payment from '../../assets/payment.svg';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../utils/helper';
import { Congrat, Paypal } from '../../components';
import { useForm } from 'react-hook-form';
import { getCurrent } from '../../store/user/asyncAction';

const Checkout = () => {
  const { currentCart, current } = useSelector((state) => state.user);
  console.log(current);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const { watch, setValue } = useForm();
  const address = watch('address');
  useEffect(() => {
    setValue('address', current?.address);
  }, [current.address]);

  useEffect(() => {
    if (isSuccess) dispatch(getCurrent());
  }, [isSuccess]);

  return (
    <div className="w-full gap-6 grid xl:grid-cols-10 items-center">
      <div className="xl:col-span-4 flex items-center justify-center mb-6 md:mb-0">
        <img src={payment} alt="payment" className="h-4/5 object-contain" />
      </div>
      {isSuccess && <Congrat />}
      <div className="xl:col-span-5 flex flex-col gap-6 items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Check Out Your Order</h2>
        <div className="flex flex-col gap-4 w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="border bg-gray-200">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-center">Quantity</th>
                <th className="p-2 text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentCart?.map((el) => (
                <tr key={el._id} className="border">
                  <td className="text-left p-2">{el.title}</td>
                  <td className="text-center p-2">{el.quantity}</td>
                  <td className="text-center p-2">{formatMoney(el.price) + ' VND'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-4 w-full py-4">
            <span className="flex items-center gap-2 text-sm ">
              <span className="font-bold text-lg">Subtotal:</span>
              <span className="text-main font-bold text-lg">{`${formatMoney(currentCart?.reduce((sum, el) => el?.price * el.quantity + sum, 0))} VND`}</span>
            </span>
            <div className="mt-4">
              <span className="flex items-center gap-2 text-sm ">
                <span className="font-bold text-lg">Address:</span>
                <span className="text-main font-bold text-lg">{current?.address}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          {
            <Paypal
              payload={{
                products: currentCart,
                total: Math.round(+currentCart?.reduce((sum, el) => el?.price * el.quantity + sum, 0) / 24000),
                address,
              }}
              setIsSuccess={setIsSuccess}
              amount={Math.round(+currentCart?.reduce((sum, el) => el?.price * el.quantity + sum, 0) / 24000)}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Checkout;
