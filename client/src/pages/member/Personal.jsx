import { Button, InputForm } from '../../components';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../assets/avatardefault.png';
import { apiUpdateCurrent } from '../../apis';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCurrent } from '../../store/user/asyncAction';
import { toast } from 'react-toastify';

const Personal = () => {
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current]);
  const handleUpdateInfo = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append('avatar', data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
      if (params.get('redirect')) navigate(params.get('redirect'));
    } else toast.error(response.message);
  };

  return (
    <div className="w-full relative px-4 flex flex-col gap-4">
      <header className="text-3xl font-semibold py-4 border-b-blue-300 border-b">Personal</header>
      <form className="w-3/5 mx-auto py-8 gap-4" onSubmit={handleSubmit(handleUpdateInfo)}>
        <div className="my-4">
          <InputForm
            label="First Name"
            register={register}
            errors={errors}
            id="firstname"
            validate={{
              required: 'Need fill this field',
              pattern: {
                value: "r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'",
                message: 'Email invalid',
              },
            }}
          />
        </div>
        <div className="my-4">
          <InputForm label="Last Name" register={register} errors={errors} id="lastname" validate={{ required: 'Need fill this field' }} />
        </div>
        <div className="my-4">
          <InputForm label="Email Address" register={register} errors={errors} id="email" validate={{ required: 'Need fill this field' }} />
        </div>
        <div className="my-4">
          <InputForm
            label="Mobile Phone"
            register={register}
            errors={errors}
            id="mobile"
            validate={{
              required: 'Need fill this field',
              pattern: {
                value: "r'^0d{9}$'",
                message: 'Phone Invalid',
              },
            }}
          />
        </div>
        <div className="my-4">
          <InputForm
            label="Address"
            register={register}
            errors={errors}
            id="address"
            validate={{
              required: 'Need fill this field',
            }}
          />
        </div>

        <div className="flex items-center gap-2 my-2">
          <span className="font-medium">Account Status: </span>
          <span>{current?.isBLocked ? 'BLocked' : 'Active'}</span>
        </div>
        <div className="flex items-center gap-2 my-2">
          <span className="font-medium">Role: </span>
          <span>{+current?.role === 0 ? 'Admin' : 'User'}</span>
        </div>
        <div className="flex items-center gap-2 my-2">
          <span className="font-medium">Created At: </span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>
        <div className="flex gap-2 my-2">
          <span className="font-medium">Profile Image: </span>
          <label htmlFor="file">
            <img src={current?.avatar || avatar} alt="avatar" className="w-20 h-20 ml-8 pt-2 object-cover rounded-full" />
          </label>
          <input type="file" id="file" {...register('avatar')} hidden />
        </div>
        <div className="w-full flex justify-end">{isDirty && <Button type="submit">Update Infomation</Button>}</div>
      </form>
    </div>
  );
};

export default Personal;
