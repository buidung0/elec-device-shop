import Button from '../../components/buttons/Button';
import InputForm from '../../components/input/InputForm';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBase64 } from '../../utils/helper';
import { toast } from 'react-toastify';
import { apiAddVariants } from '../../apis';
import Swal from 'sweetalert2';
import { showModal } from '../../store/app/appSlice';
import Loading from '../../components/common/Loading';

const CustomizeVarriants = ({ customizeVarriants, setCustomizeVarriants, render }) => {
  const { category } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState({
    privewThumb: '',
    images: [],
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const handlePreviewThumb = async (file) => {
    if (!file) return '';
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagePreview = [];
    for (let file of files) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        toast.warning('File not supported!');
        return;
      }
      const base64 = await getBase64(file);
      imagePreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagePreview }));
  };

  useEffect(() => {
    if (watch('thumb') instanceof FileList && watch('thumb').length > 0) handlePreviewThumb(watch('thumb')[0]);
  }, [watch('thumb')]);
  useEffect(() => {
    if (watch('images') instanceof FileList && watch('images').length > 0) handlePreviewImages(watch('images'));
  }, [watch('images')]);

  useEffect(() => {
    reset({
      title: customizeVarriants?.title,
      color: customizeVarriants?.color,
      price: customizeVarriants?.price,
    });
  }, [customizeVarriants]);
  const handleAddVariants = async (data) => {
    if (data.color === customizeVarriants.color) Swal.fire('Oops!', 'Color not change', 'info');
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append('thumb', data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append('images', image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVariants(formData, customizeVarriants._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        reset();
        setPreview({ thumb: '', images: [] });
      } else toast.error(response.message);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 relative select-none">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b  flex items-center justify-between bg-gray-100 fixed left-[327px] top-0 right-0">
        <h1 className="text-3xl font-bold tracking-tight ">Customize Variants Products</h1>
        <span className="text-main hover:underline cursor-pointer " onClick={() => setCustomizeVarriants(null)}>
          Back
        </span>
      </div>
      <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit(handleAddVariants)}>
        <div className="flex  gap-4 items-center w-full">
          <InputForm
            label="Name Product"
            register={register}
            errors={errors}
            id="title"
            fullWidth
            style="flex-auto "
            validate={{ required: 'Need fill this field' }}
            placeholder="Title of Variants"
          />
        </div>
        <div className="w-full my-6 flex items-center gap-4">
          <InputForm
            label="Price Variants"
            register={register}
            errors={errors}
            id="price"
            validate={{ required: 'Need fill this field' }}
            style="flex-auto"
            placeholder="Price of Variants"
            type="number"
          />
          <InputForm
            label="Color Variants"
            register={register}
            errors={errors}
            id="color"
            validate={{ required: 'Need fill this field' }}
            style="flex-auto"
            placeholder="Color of new Variants"
          />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="thumb" className="font-semibold">
            Upload Thumb
          </label>
          <input type="file" id="thumb" {...register('thumb', { required: 'No File Choosen' })} />
          {errors['thumb'] && <small className="text-xs text-red-500">{errors['thumb']?.message}</small>}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img src={preview.thumb} alt="thumbnail" className="w-[200px] object-contain" />
          </div>
        )}

        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="Products" className="font-semibold">
            Upload Images of Product
          </label>
          <input type="file" id="Products" multiple {...register('images', { required: 'No File Choosen' })} />
          {errors['images'] && <small className="text-xs text-red-500">{errors['images']?.message}</small>}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4 flex w-full gap-3 flex-wrap">
            {preview.images?.map((el, idx) => (
              <div className="w-fit relative">
                <img key={idx} src={el} alt="product" className="w-[200px] object-contain" />
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Button type="submit">Add Variants</Button>
        </div>
      </form>
    </div>
  );
};

export default memo(CustomizeVarriants);
