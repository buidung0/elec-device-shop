import React, { memo, useState, useCallback, useEffect } from 'react';
import { InputForm, Select, MarkdownEditor, Button, Loading } from '../../components';
import { useForm } from 'react-hook-form';
import { getBase64 } from '../../utils/helper';
import { toast } from 'react-toastify';
import { validate1 } from '../../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import { apiUpdateProduct } from '../../apis';
import { showModal } from '../../store/app/appSlice';
import clsx from 'clsx';

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({ description: '' });
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const { category } = useSelector((state) => state.app);
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
        title: editProduct?.title || '',
        price: editProduct?.price || '',
        quantity: editProduct?.quantity || '',
        color: editProduct?.color || '',
        category: editProduct?.category || '',
        brand: editProduct?.brand?.toLowerCase() || '',
      });
      setPayload({
        description:
          typeof editProduct?.description === 'object'
            ? editProduct?.description?.join(', ')
            : editProduct?.description,
      });
      setPreview({
        thumb: editProduct?.thumb || '',
        images: editProduct?.images || [],
      });
      return () => {
        clearTimeout(timeoutId);
      };
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [editProduct]);
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload],
  );
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
  // console.log(editProduct);
  // console.log(preview);
  const handleUpdateProduct = async (data) => {
    const invalids = validate1(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category) data.category = category?.find((el) => el.title === data.category)?.title;
      const finalPayload = { ...data, ...payload };
      // console.log('>>>final', finalPayload);
      finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb)
        formData.append('thumb', finalPayload?.thumb?.length === 0 ? preview.thumb : finalPayload.thumb[0]);
      finalPayload.images = data?.images?.length === 0 ? preview.images : data.images;
      if (finalPayload.images) {
        const images = finalPayload?.image?.length === 0 ? preview.images : finalPayload.images;
        for (let image of images) formData.append('images', image);
      }
      console.log('>>>final', finalPayload);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateProduct(formData, editProduct._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        render();
        setEditProduct(null);
      } else {
        toast.error(response.message);
      }
    }
  };
  console.log(preview);
  // console.log(editProduct);
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b  flex items-center justify-between bg-gray-100 fixed left-[327px] top-0 right-0">
        <h1 className="text-3xl font-bold tracking-tight ">Update Products</h1>
        <span className="text-main hover:underline cursor-pointer " onClick={() => setEditProduct(null)}>
          Back
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Name Product.."
            register={register}
            errors={errors}
            id="title"
            validate={{ required: 'Need fill this field' }}
            placeholder="Name of new product"
          />
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label="Price"
              register={register}
              errors={errors}
              id="price"
              validate={{ required: 'Need fill this field' }}
              style={clsx('flex-auto')}
              placeholder="Price of new product"
              type="number"
            />
            <InputForm
              label="Quantity"
              register={register}
              errors={errors}
              id="quantity"
              validate={{ required: 'Need fill this field' }}
              style={clsx('flex-auto')}
              placeholder="Quantity of new product"
              type="number"
            />
            <InputForm
              label="Color"
              register={register}
              errors={errors}
              id="color"
              validate={{ required: 'Need fill this field' }}
              style={clsx('flex-auto')}
              placeholder="Color of new product"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <Select
              label="Category"
              options={category?.map((el) => ({ code: el.title, value: el.title }))}
              register={register}
              id="category"
              validate={{ required: 'Need fill this field' }}
              style={clsx('flex-auto')}
              errors={errors}
              fullWidth={true}
            />
            <Select
              label="Brand (Optional)"
              options={category
                ?.find((el) => el.title === watch('category'))
                ?.brand?.map((el) => ({ code: el.toLowerCase(), value: el }))}
              register={register}
              id="brand"
              style="flex-auto"
              errors={errors}
              fullWidth={true}
            />
          </div>
          <MarkdownEditor
            name="description"
            changeValue={changeValue}
            label="Description"
            invalidField={invalidFields}
            setInvalidField={setInvalidFields}
            value={payload.description}
          />
          <div className="flex flex-col gap-2 mt-8">
            <label htmlFor="thumb" className="font-semibold">
              Upload Thumb
            </label>
            <input type="file" id="thumb" {...register('thumb')} />
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
            <input type="file" id="Products" multiple {...register('images')} />
            {errors['images'] && <small className="text-xs text-red-500">{errors['images']?.message}</small>}
          </div>
          {preview.images?.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images?.map((el, idx) => (
                <div className="w-fit relative" key={idx}>
                  <img src={el} alt="product" className="w-[200px] object-contain" />
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Button type="submit">Update New Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
