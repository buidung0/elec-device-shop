import React, { useEffect, useState, useCallback, memo } from 'react';
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from '../../apis/user';
import { roles, blockStatus } from '../../utils/constant';
import moment from 'moment';
import { InputField, Pagination, InputForm, Select, Button } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import clsx from 'clsx';

const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ email: '', firstname: '', lastname: '', role: '', phone: '', isBlocked: '' });
  const [user, setUser] = useState(null);
  const [queries, setQueries] = useState({ q: '' });
  const [params] = useSearchParams();
  const [editEle, setEditEle] = useState(null);
  const [update, setUpdate] = useState(false);
  const fetchUser = async (params) => {
    const response = await apiGetUsers({ ...params, limit: +import.meta.env.VITE_LIMIT });
    if (response.success) setUser(response);
  };
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const queriesDebounce = useDebounce(queries.q, 800);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUser(queries);
  }, [queriesDebounce, params]);
  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editEle?._id);
    if (response.success) {
      setEditEle(null);
      render();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: 'Announcement !!!',
      text: 'A  U sure to delete this account?',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  return (
    <div className={clsx('w-full p-4', editEle && 'pl-16')}>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
        <span>Manage User</span>
      </h1>
      <div className="w-full p-4 ">
        <div className="flex justify-end py-4">
          <InputField nameKey={'q'} value={queries.q} setValue={setQueries} style={clsx('w-500')} placeholder="Search name and email user..." isHideLabel />
        </div>
        <form className="" onSubmit={handleSubmit(handleUpdate)}>
          {editEle && <Button type="submit">Update</Button>}
          <table className="w-full table-auto text-left mb-6">
            <thead className="bg-gray-800 text-white font-bold">
              <tr className="border border-gray-300">
                <th className="px-4 py-2 ">#</th>
                <th className="px-4 py-2 ">Email address</th>
                <th className="px-4 py-2 ">First Name</th>
                <th className="px-4 py-2 ">Last Name</th>
                <th className="px-4 py-2 ">Role</th>
                <th className="px-4 py-2 ">Phone</th>
                <th className="px-4 py-2 ">Status</th>
                <th className="px-4 py-2 ">createdAt</th>
                <th className="px-4 py-2 ">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {user?.users?.map((el, idx) => (
                <tr key={el._id} className="border border-gray-300">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">
                    {editEle?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={'email'}
                        validate={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        }}
                        fullWidth
                        defaultValue={editEle?.email}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEle?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={'firstname'}
                        validate={{ required: 'Require fill' }}
                        fullWidth
                        defaultValue={editEle?.firstname}
                      />
                    ) : (
                      <span>{el.firstname}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEle?._id === el._id ? (
                      <InputForm register={register} errors={errors} id={'lastname'} validate={{ required: 'Require fill' }} fullWidth defaultValue={editEle?.lastname} />
                    ) : (
                      <span>{el.lastname}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEle?._id === el._id ? (
                      <Select register={register} fullWidth errors={errors} id={'role'} validate={{ required: 'Require fill' }} defaultValue={el.role} option={roles} />
                    ) : (
                      <span>{roles.find((role) => +role.code === +el.role)?.value}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEle?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={'mobile'}
                        validate={{
                          required: true,
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: 'Invalid phone number',
                          },
                        }}
                        fullWidth
                        defaultValue={editEle?.mobile}
                      />
                    ) : (
                      <span>{el.mobile}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEle?._id === el._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={'isBlocked'}
                        validate={{ required: 'Require fill' }}
                        defaultValue={el.isBlocked}
                        option={blockStatus}
                      />
                    ) : (
                      <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                  <td className="px-4 py-2">
                    {editEle?._id === el._id ? (
                      <span onClick={() => setEditEle(null)} className="text-orange-600 hover:underline cursor-pointer px-2">
                        Back
                      </span>
                    ) : (
                      <span onClick={() => setEditEle(el)} className="text-orange-600 hover:underline cursor-pointer px-2">
                        Edit
                      </span>
                    )}
                    <span className="text-orange-600 hover:underline cursor-pointer" onClick={() => handleDeleteUser(el._id)}>
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div className="w-full text-right flex justify-end ">
          <Pagination totalCount={user?.counts} />
        </div>
      </div>
    </div>
  );
};

export default memo(ManageUser);
