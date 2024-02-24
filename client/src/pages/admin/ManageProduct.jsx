import React, { memo, useCallback, useEffect, useState } from 'react';
import { CustomizeVarriants, InputForm, Pagination } from '../../components';
import { useForm } from 'react-hook-form';
import { apiGetProduct, apiDeleteProduct } from '../../apis/product';
import moment from 'moment';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import UpdateProduct from './UpdateProduct';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BiCustomize } from 'react-icons/bi';

const ManageProduct = () => {
  const [products, setProducts] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation;
  const [params] = useSearchParams();
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [customizeVarriants, setCustomizeVarriants] = useState(null);
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const fetchProducts = async (params) => {
    const response = await apiGetProduct({ ...params, limit: import.meta.env.VITE_LIMIT });
    if (response.success) {
      setProducts(response.products);
      setCount(response.counts);
    }
  };

  const handleDeleteproduct = (pid) => {
    Swal.fire({
      title: 'Are You sure ?',
      text: 'Are You sure ?',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        render();
      }
    });
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

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
  }, [params, update]);

  // console.log(products);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 bg-white min-h-screen z-50">
          <UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct} />
        </div>
      )}
      {customizeVarriants && (
        <div className="absolute inset-0 bg-white min-h-screen z-50">
          <CustomizeVarriants
            customizeVarriants={customizeVarriants}
            render={render}
            setCustomizeVarriants={setCustomizeVarriants}
          />
        </div>
      )}
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b w-full flex items-center justify-between bg-gray-100 fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight ">Manage Products</h1>
      </div>
      <div className="flex w-full justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search product by title, description"
          />
        </form>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="border bg-sky-900 text-white border-white ">
            <th className="text-center py-2">No.</th>
            <th className="text-center py-2">Thumb</th>
            <th className="text-center py-2">Title</th>
            <th className="text-center py-2">Brand</th>
            <th className="text-center py-2">Category</th>
            <th className="text-center py-2">Price</th>
            <th className="text-center py-2">Quantity</th>
            <th className="text-center py-2">Sold</th>
            <th className="text-center py-2">Color</th>
            <th className="text-center py-2">Ratings</th>
            <th className="text-center py-2">Variants</th>
            <th className="text-center py-2">updatedAt</th>
            <th className="text-center py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, idx) => (
            <tr key={el._id} className="border-b">
              <td className="text-center py-2">
                {(+params.get('page') > 1 ? +params.get('page') - 1 : 0) * import.meta.env.VITE_LIMIT + idx + 1}
              </td>
              <td className="text-center py-2">
                <img src={el.thumb} alt="thumb" className="w-12 object-cover" />
              </td>
              <td className="text-center py-2">{el.title}</td>
              <td className="text-center py-2">{el.brand}</td>
              <td className="text-center py-2">{el.category}</td>
              <td className="text-center py-2">{el.price}</td>
              <td className="text-center py-2">{el.quantity}</td>
              <td className="text-center py-2">{el.sold}</td>
              <td className="text-center py-2">{el.color}</td>
              <td className="text-center py-2">{el.totalRating}</td>
              <td className="text-center py-2">{el?.variants?.length || 0}</td>
              <td className="text-center py-2">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
              <td className="text-center py-2">
                <span
                  className="text-blue-600 hover:underline hover:text-orange-500 cursor-pointer px-1 inline-block"
                  onClick={() => setEditProduct(el)}
                >
                  <BiEdit size={20} />
                </span>
                <span
                  className="text-blue-600 hover:underline hover:text-orange-500 cursor-pointer px-1 inline-block"
                  onClick={() => handleDeleteproduct(el._id)}
                >
                  <RiDeleteBin6Fill size={20} />
                </span>
                <span
                  className="text-blue-600 hover:underline hover:text-orange-500 cursor-pointer px-1 inline-block"
                  onClick={() => setCustomizeVarriants(el)}
                >
                  <BiCustomize size={20} />
                </span>
              </td>
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

export default memo(ManageProduct);
