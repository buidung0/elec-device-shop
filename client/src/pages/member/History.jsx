import { apiGetOrder } from '../../apis';
import { CustomSelect, InputForm, Pagination } from '../../components';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { statusOrder } from '../../utils/constant';

const History = () => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const status = watch('status');
  const fetchOrders = async (params) => {
    const response = await apiGetOrder({ ...params, limit: import.meta.env.VITE_LIMIT });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({ pathname: location.pathname, search: createSearchParams({ status: value }).toString() });
  };
  return (
    <div>
      <div className="p-4 border-b w-full flex items-center justify-between bg-gray-100 fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight ">History Cart</h1>
      </div>
      <div className="h-[69px] w-full"></div>
      <div className="flex w-full justify-end items-center px-4">
        <form className="w-[45%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <InputForm id="q" register={register} errors={errors} fullWidth placeholder="Search Order by status" />
          </div>
          <div className="col-span-1 flex items-center">
            <CustomSelect options={statusOrder} value={status} onChange={(val) => handleSearchStatus(val)} wrapClassname="w-full" />
          </div>
        </form>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border bg-sky-900 text-white border-white ">
            <th className="text-center py-2">No.</th>
            <th className="text-center py-2">Products</th>
            <th className="text-center py-2">Total</th>
            <th className="text-center py-2">Status</th>
            <th className="text-center py-2">createdAt</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, idx) => (
            <tr key={el._id} className="border-b">
              <td className="text-center py-2">{(+params.get('page') > 1 ? +params.get('page') - 1 : 0) * import.meta.env.VITE_LIMIT + idx + 1}</td>
              <td className="text-center py-2 max-w-[400px]">
                <span className="grid grid-cols-4 gap-4">
                  {el.products?.map((item) => (
                    <span key={item._id} className="flex col-span-1 items-center gap-2">
                      <img src={item.thumbnail} alt="thumb" className="w-8 h-8 rounded-md object-cover" />
                      <span className="flex flex-col">
                        <span className="text-main text-sm">{item.title}</span>
                        <span className="flex items-center text-xs">
                          <span>Quantity:</span>
                          <span className="text-main gap-2">{item.quantity}</span>
                        </span>
                      </span>
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center py-2">{el.total + '💲'}</td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">{moment(el?.createdAt).format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex  my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default History;
