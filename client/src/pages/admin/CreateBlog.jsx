import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { InputForm, Button, Loading } from '../../components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBase64, validate1 } from '../../utils/helper';
import { toast } from 'react-toastify';
import { apiCreateBlog } from '../../apis';
import { showModal } from '../../store/app/appSlice';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { currentBlog } = useSelector((state) => state.blog);
  const [payload, setPayload] = useState({
    description: '',
  });
  const [preview, setPreview] = useState({
    image: '',
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const changeValue = (e) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      description: e.target.value,
    }));
  };

  const handlePreviewThumb = async (file) => {
    console.log(123);
    if (file) {
      const base64Thumb = await getBase64(file);
      setPreview((prev) => ({ ...prev, image: base64Thumb }));
    } else {
      console.error('File is null or undefined');
    }
  };

  useEffect(() => {
    if (watch('image')) handlePreviewThumb(watch('image')[0]);
  }, [watch('image')]);

  // console.log(currentBlog);
  // console.log(preview);
  const handleCreateBlog = async (data) => {
    const invalids = validate1(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };
      // console.log(finalPayload);
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.image) formData.append('image', finalPayload.image[0]);
      console.log(formData.getAll('image'));
      // console.log(finalPayload.image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiCreateBlog(formData);
      // console.log(response);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        reset();
        setPayload({
          image: '',
        });
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className={clsx('w-full p-4 gap-2')}>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
        <span>Create New Product</span>
      </h1>
      <div className="p-4 gap-2">
        <form onSubmit={handleSubmit(handleCreateBlog)}>
          <InputForm
            label="Title of Blog"
            register={register}
            errors={errors}
            id="title"
            style="mb-3"
            validate={{ required: 'Need fill this field' }}
            placeholder="Name of new Blog"
          />
          <div className="">
            <InputForm
              label="Category"
              register={register}
              errors={errors}
              id="category"
              style="mb-3"
              validate={{ required: 'Need fill this field' }}
              placeholder="Name of new Category"
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="">Description</label>
            <textarea
              id="description"
              label="Description"
              className="w-full"
              rows={4}
              onChange={(e) => changeValue(e)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <label htmlFor="image" className="font-semibold">
              Upload Blog image
            </label>
            <input type="file" id="image" {...register('image', { required: 'No File Choosen' })} />
            {errors['image'] && <small className="text-xs text-red-500">{errors['image']?.message}</small>}
          </div>
          {preview.image && (
            <div className="my-4">
              <img src={preview.image} alt="thumbnail" className="w-[200px] object-contain" />
            </div>
          )}

          <div className="mt-8">
            <Button type="submit">Create New Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
