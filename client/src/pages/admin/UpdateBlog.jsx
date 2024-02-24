import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBase64, validate1 } from '../../utils/helper';
import { apiUpdateBlog } from '../../apis';
import { useForm } from 'react-hook-form';
import { Button, InputForm, Loading } from '../../components';
import { showModal } from '../../store/app/appSlice';

const UpdateBlog = ({ editBlog, render, setEditBlog }) => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({ description: '' });
  const [preview, setPreview] = useState({ image: null });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      reset({
        title: editBlog?.title || '',
        category: editBlog?.category || '',
        // description: editBlog?.description || '',
      });
      setPayload({
        description: editBlog?.description || '',
      });
      setPreview({
        image: editBlog?.image || '',
      });
      return () => {
        clearTimeout(timeoutId);
      };
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [editBlog]);

  const [invalidFields, setInvalidFields] = useState([]);

  const changeValue = (e) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      description: e.target.value,
    }));
  };

  const handlePreviewImage = async (file) => {
    if (file) {
      const base64Thumb = await getBase64(file);
      setPreview((prev) => ({ ...prev, image: base64Thumb }));
    } else {
      console.error('File is null or undefined');
    }
  };

  useEffect(() => {
    if (watch('image') instanceof FileList && watch('image').length > 0) {
      handlePreviewImage(watch('image')[0]);
    }
  }, [watch('image')]);

  const handleUpdateBlog = async (data) => {
    const invalids = validate1(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };
      // console.log('>>>final', finalPayload);
      finalPayload.image = data?.image?.length === 0 ? preview.image : data.image[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.image)
        formData.append('image', finalPayload?.image?.length === 0 ? preview.image : finalPayload.image[0]);
      // console.log('>>>final', finalPayload);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateBlog(formData, editBlog._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      // console.log(response);
      if (response.success) {
        toast.success(response.message);
        render();
        setEditBlog(null);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b  flex items-center justify-between bg-gray-100 fixed left-[327px] top-0 right-0">
        <h1 className="text-3xl font-bold tracking-tight ">Update BLog</h1>
        <span className="text-main hover:underline cursor-pointer " onClick={() => setEditBlog(null)}>
          Back
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateBlog)}>
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
              rows={10}
              onChange={(e) => changeValue(e)}
              value={payload.description}
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
            <Button type="submit">Update BLog</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateBlog);
