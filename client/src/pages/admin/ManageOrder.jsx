import React, { useEffect, useState } from 'react';
import { InputForm, Pagination } from '../../components';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { apiGetOrder, apiGetService } from '../../apis';

const ManageOrder = () => {
  const [orders, setOrders] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation;
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const fetchProducts = async (params) => {
    const response = await apiGetOrder({ ...params, limit: import.meta.env.VITE_LIMIT });
    console.log(response);
    if (response.success) {
      setOrders(response.orders);
      setCount(response.counts);
    }
  };

  const queryDebounce = useDebounce(watch('q'), 800);

  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params]);

  // console.log(blog);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b w-full flex items-center justify-between bg-gray-100 fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight ">Manage Products</h1>
      </div>
      <div className="flex w-full justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm id="q" register={register} errors={errors} fullWidth placeholder="Search product by title, description" />
        </form>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="border bg-sky-900 text-white border-white ">
            <th className="text-center py-2">No.</th>
            <th className="text-center py-2">Email</th>
            <th className="text-center py-2">Name</th>
            <th className="text-center py-2">Phone</th>
            <th className="text-center py-2">Message</th>
            <th className="text-center py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, idx) => (
            <tr key={el._id} className="border-b">
              <td className="text-center py-2">{(+params.get('page') > 1 ? +params.get('page') - 1 : 0) * import.meta.env.VITE_LIMIT + idx + 1}</td>
              <td className="text-center py-2 ">
                <p className="line-clamp-2 px-2 max-w-xs">{el.email}</p>
              </td>
              <td className="text-center py-2 ">
                <p className="line-clamp-2 px-2 max-w-xs">{el.name}</p>
              </td>
              <td className="text-center py-2 ">
                <p className="line-clamp-2 px-2 max-w-xs">{el.phone}</p>
              </td>
              <td className="text-center py-2 ">
                <p className="line-clamp-2 px-2 max-w-xs">{el.message}</p>
              </td>
              <td className="text-center py-2">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex  my-8">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
};

export default ManageOrder;
