import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiProduct, apiGetProduct, apiUpdateCart } from '../../apis';
import { BreadCrumb, Button, SelectQuantity, ProductExtraInfoItem, ProductInfomation, CustomSlider } from '../../components';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, renderStarFromNumber } from '../../utils/helper';
import { productExtraInfomation } from '../../utils/constant';
import DOMPurify from 'dompurify';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getCurrent } from '../../store/user/asyncAction';
import path from '../../utils/path';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = ({ isQuickView, closeModal, data }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const titleRef = useRef();
  const { current } = useSelector((state) => state.user);
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [currentImages, setCurrentImages] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [variants, setVariants] = useState(null);
  const [pid, setPid] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: '',
    thumb: '',
    images: [],
    price: '',
    color: '',
  });
  const fetchProductData = async () => {
    const response = await apiProduct(pid);
    if (response.success) {
      setProduct(response.createdProduct);
      setCurrentImages(response.createdProduct?.thumb);
    }
  };
  const fetchProducts = async () => {
    const response = await apiGetProduct({ category: category });
    if (response.success) setRelatedProducts(response.products);
  };
  useEffect(() => {
    if (data) {
      setPid(data.pid);
      setCategory(data.category);
    } else if (params) {
      setPid(params.pid);
      setCategory(params.category);
    }
  }, [data, params]);

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scrollTo(0, 0);
    titleRef.current.scrollIntoView({ block: 'center' });
    window.scrollTo(0, 0);
  }, [pid, params.pid, update]);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity],
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag.trim() === ' minus' && +quantity <= 1) return;
      if (flag.trim() === 'minus') setQuantity((prev) => +prev - 1);
      if (flag.trim() === 'plus') setQuantity((prev) => +prev + 1);
    },
    [quantity],
  );
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImages(el);
  };
  const reRender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  useEffect(() => {
    if (variants) {
      setCurrentProduct({
        title: product?.variants?.find((el) => el.sku === variants)?.title,
        thumb: product?.variants?.find((el) => el.sku === variants)?.thumb,
        color: product?.variants?.find((el) => el.sku === variants)?.color,
        price: product?.variants?.find((el) => el.sku === variants)?.price,
        images: product?.variants?.find((el) => el.sku === variants)?.images,
      });
    } else {
      setCurrentProduct({
        title: product?.title,
        thumb: product?.thumb,
        color: product?.color,
        price: product?.price,
        images: product?.images || [],
      });
    }
  }, [variants, product]);
  const handleAddToCart = async () => {
    if (!current)
      return Swal.fire({
        title: 'Almost....',
        text: 'Please Login First',
        icon: 'info',
        cancelButtonText: 'Not now!',
        showCancelButton: true,
        confirmButtonText: 'Go Login Page',
      }).then((rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({ redirect: location.pathname }).toString(),
          });
      });
    const response = await apiUpdateCart({
      pid: pid,
      color: currentProduct?.color || product?.color,
      quantity,
      price: currentProduct?.price || product?.price,
      thumbnail: currentProduct?.thumb || product?.thumb,
      title: currentProduct?.title || product?.title,
    });
    if (response.success) {
      toast.success(response.message);
      dispatch(getCurrent());
    } else toast.error(response.message);
  };
  // console.log({ currentProduct });
  // console.log(product);
  return (
    <div className={clsx('w-full')}>
      {!isQuickView && (
        <div className="h-[81px] flex items-center justify-center bg-gray-100" ref={titleRef}>
          <div className="w-main">
            <h3 className="font-semibold">{currentProduct?.title || product?.title}</h3>
            <BreadCrumb title={currentProduct?.title || product?.title} category={category} />
          </div>
        </div>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx('m-auto mt-4 flex bg-white', isQuickView ? 'max-w-[900px] gap-16 p-8 max-h-[80vh] overflow-auto' : 'w-main')}
      >
        <div className={clsx('flex flex-col gap-4 w-2/5', isQuickView && 'w-1/2')}>
          <div className="h-[458px] w-[458px] border flex items-center  overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: currentProduct?.thumb || currentImages,
                },
                largeImage: {
                  src: currentProduct?.thumb || currentImages,
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider className="image-slider flex gap-2 justify-between" {...settings}>
              {!product?.images?.length === 0 &&
                product?.map((el) => (
                  <div key={el} className="flex-1">
                    <img src={el} alt="sub-product" className="h-[143px] w-[143px]  border object-cover cursor-pointer" onClick={(e) => handleClickImage(e, el)} />
                  </div>
                ))}
              {product?.images?.length > 0 &&
                product?.images?.map((el) => (
                  <div key={el} className="flex-1">
                    <img src={el} alt="sub-product" className="h-[143px] w-[143px]  border object-cover cursor-pointer" onClick={(e) => handleClickImage(e, el)} />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className=" w-2/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-semibold">{`${formatMoney(formatPrice(currentProduct?.price || product?.price))} VND`}</h2>
            <span className="text-sm text-main mr-4">{`In Stock: ${product?.quantity}`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStarFromNumber(product?.totalRating)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main">{`(Sold: ${product?.sold} pieces)`}</span>
          </div>
          <ul className="list-square text-sm text-gray-500 pl-4">
            {product?.description?.length > 1 &&
              product?.description?.map((el, index) => (
                <li key={index} className="leading-6">
                  {el}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div className="text-sm line-clamp-[10] mb-8" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}></div>
            )}
          </ul>
          <div className="my-4 flex items-center gap-4">
            <span className="font-bold">color</span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div className={clsx('flex items-center gap-2 p-2 border cursor-pointer', !variants && 'border-red-500')} onClick={() => setVariants(null)}>
                <img src={product?.thumb} alt="thumb" className="w-8 h-8 rounded-md object-cover" />
                <span className="flex flex-col">
                  <span>{product?.color}</span>
                  <span className="text-sm">{product?.price}</span>
                </span>
              </div>
              {product?.variants?.map((el) => (
                <div
                  key={el.sku}
                  className={clsx('flex items-center gap-2 p-2 border cursor-pointer', variants === el.sku && 'border-red-500')}
                  onClick={() => setVariants(el.sku)}
                >
                  <img src={el.thumb} alt="thumb" className="w-8 h-8 rounded-md object-cover" />
                  <span className="flex flex-col">
                    <span>{el.color}</span>
                    <span className="text-sm">{el.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className=" flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} />
            </div>
            <Button fw handleOnClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>
        </div>
        {!isQuickView && (
          <div className="w-1/5">
            {productExtraInfomation?.map((el) => (
              <ProductExtraInfoItem key={el.id} icon={el.icon} title={el.title} sub={el.sub} />
            ))}
          </div>
        )}
      </div>
      {!isQuickView && (
        <div className="w-main m-auto mt-8">
          <ProductInfomation totalRating={product?.totalRating} ratings={product?.ratings} nameProduct={product?.title} pid={product?._id} reRender={reRender} />
        </div>
      )}
      {[
        !isQuickView && (
          <>
            <div className="w-main m-auto mt-8">
              <h3 className="text-[20px] py-[15px] border-b-2 border-main font-semibold">OTHER CUSTOMERS ALSO BUY:</h3>
              <CustomSlider products={relatedProducts} normal={true} />
            </div>
            <div className="h-[100px] w-full"></div>
          </>
        ),
      ]}
    </div>
  );
};

export default DetailProduct;
//totalRatings={product.totalRating} totalCount={18}
