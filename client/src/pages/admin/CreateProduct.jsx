import React, { memo, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { InputForm, Select, Button, MarkdownEditor, Loading } from '../../components';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { validate1, getBase64 } from '../../utils/helper';
import { toast } from 'react-toastify';
import { apiCreateProduct } from '../../apis/product';
import { showModal } from '../../store/app/appSlice';

const CreateProduct = () => {
  const { category } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    description: '',
  });
  const [preview, setPreview] = useState({
    thumb: '',
    images: [],
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [hoverElm, setHoverElm] = useState(null);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload],
  );

  const handlePreviewThumb = async (file) => {
    if (file) {
      const base64Thumb = await getBase64(file);
      setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    } else {
      console.error('File is null or undefined');
    }
  };

  const handlePreviewImages = async (files) => {
    const imagePreview = [];
    for (let file of files) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        toast.warning('File not supported!');
        return;
      }
      const base64 = await getBase64(file);
      imagePreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagePreview }));
  };

  useEffect(() => {
    if (watch('thumb')) handlePreviewThumb(watch('thumb')[0]);
  }, [watch('thumb')]);

  // console.log(category);

  useEffect(() => {
    if (watch('images')) handlePreviewImages(watch('images'));
  }, [watch('images')]);

  const handleCreateProduct = async (data) => {
    // console.log(data);
    const invalids = validate1(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category) data.category = category?.find((el) => el._id === data.category)?.title;
      const finalPayload = { ...data, ...payload };
      // console.log(finalPayload);
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0]);
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append('images', image);
      }
      console.log(formData.getAll('thumb'));
      // console.log(finalPayload.thumb);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiCreateProduct(formData);
      // console.log(response);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        reset();
        setPayload({
          thumb: '',
          image: [],
        });
      } else {
        toast.error(response.message);
      }
    }
  };
  console.log(preview);
  return (
    <div className={clsx('w-full p-4')}>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
        <span>Create New Product</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
              options={category?.map((el) => ({ code: el._id, value: el.title }))}
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
                ?.find((el) => el._id === watch('category'))
                ?.brand?.map((el) => ({ code: el, value: el }))}
              register={register}
              id="brand"
              style={clsx('flex-auto')}
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
          />
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
                <div
                  className="w-fit relative"
                  onMouseEnter={() => setHoverElm(el.name)}
                  onMouseLeave={() => setHoverElm(null)}
                >
                  <img key={idx} src={el.path} alt="product" className="w-[200px] object-contain" />
                </div>
              ))}
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

export default memo(CreateProduct);
/**{/* {hoverElm === el.name && (
                    <div
                      className="absolute inset-0 cursor-pointer bg-overlay flex items-center justify-center"
                      onClick={() => handleRemoveImages(el.name)}
                    >
                      <MdDeleteForever size={24} color="red" />
                    </div>
                  )}} */
