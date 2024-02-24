import React, { useCallback, useEffect, useState } from 'react';
import { CustomizeVarriants, InputForm, Pagination } from '../../components';
import { useForm } from 'react-hook-form';
import { apiDeleteProduct } from '../../apis/product';
import moment from 'moment';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { apiDeleteBlog, apiGetBlog } from '../../apis';
import UpdateBlog from './UpdateBlog';

const ManageBlog = () => {
  const [blog, setBlog] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation;
  const [params] = useSearchParams();
  const [editBLog, setEditBlog] = useState(null);
  const [update, setUpdate] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const fetchProducts = async (params) => {
    const response = await apiGetBlog({ ...params, limit: import.meta.env.VITE_LIMIT });
    if (response.success) {
      setBlog(response.Blog);
      setCount(response.counts);
    }
  };

  const handleDeleteBlog = (bid) => {
    Swal.fire({
      title: 'Are You sure ?',
      text: 'Delete this Blog',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteBlog(bid);
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

  // console.log(blog);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editBLog && (
        <div className="absolute inset-0 bg-white min-h-screen z-50">
          <UpdateBlog editBlog={editBLog} setEditBlog={setEditBlog} render={render} />
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
            <th className="text-center py-2">Image</th>
            <th className="text-center py-2">Title</th>
            <th className="text-center py-2">Description</th>
            <th className="text-center py-2">Category</th>
            <th className="text-center py-2">Views</th>
            <th className="text-center py-2">Likes</th>
            <th className="text-center py-2">Dislikes</th>
            <th className="text-center py-2">UpdatedAt</th>
            <th className="text-center py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {blog?.map((el, idx) => (
            <tr key={el._id} className="border-b">
              <td className="text-center py-2">
                {(+params.get('page') > 1 ? +params.get('page') - 1 : 0) * import.meta.env.VITE_LIMIT + idx + 1}
              </td>
              <td className="text-center py-2">
                <img src={el.image} alt="thumb" className="w-12 object-cover" />
              </td>
              <td className="text-center py-2 ">
                <p className="line-clamp-2 px-2 max-w-xs">{el.title}</p>
              </td>
              <td className="text-center py-2 ">
                <p className="line-clamp-2 px-2 max-w-xs">{el.category}</p>
              </td>
              <td className="text-center py-2 ">
                <p className="line-clamp-2 px-2 max-w-xs">{el.description}</p>
              </td>
              <td className="text-center py-2">{el.numberView}</td>
              <td className="text-center py-2">{el.likes.length}</td>
              <td className="text-center py-2">{el.dislikes.length}</td>
              <td className="text-center py-2">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
              <td className="text-center py-2">
                <span
                  className="text-blue-600 hover:underline hover:text-orange-500 cursor-pointer px-1 inline-block"
                  onClick={() => setEditBlog(el)}
                >
                  <BiEdit size={20} />
                </span>
                <span
                  className="text-blue-600 hover:underline hover:text-orange-500 cursor-pointer px-1 inline-block"
                  onClick={() => handleDeleteBlog(el._id)}
                >
                  <RiDeleteBin6Fill size={20} />
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

export default ManageBlog;
