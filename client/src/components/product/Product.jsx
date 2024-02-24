import React, { useState, memo } from 'react';
import { formatMoney } from '../../utils/helper';
import label from '../../assets/new.png';
import trending from '../../assets/trending.png';
import { renderStarFromNumber } from '../../utils/helper';
import SelectOption from '../../components/search/SelectOption';
import icons from '../../utils/icons';
import withBase from '../../hocs/withBase';
import { showModal } from '../../store/app/appSlice';
import { DetailProduct } from '../../pages/public';
import { apiUpdateCart, apiupdateWishlist } from '../../apis';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCurrent } from '../../store/user/asyncAction';
import Swal from 'sweetalert2';
import path from '../../utils/path';
import { BsCartCheckFill, BsCartPlusFill } from 'react-icons/bs';
import { createSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const { BsFillSuitHeartFill, AiFillEye } = icons;

const Product = ({ productData, isNew, normal, navigate, dispatch, location, pid, className }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);

  const handleClickOption = async (e, flag) => {
    e.stopPropagation();
    if (flag === 'CART') {
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
        pid: productData?._id,
        color: productData?.color,
        quantity: 1,
        price: productData?.price,
        thumbnail: productData?.thumb,
        title: productData?.title,
      });
      if (response.success) {
        toast.success(response.message);
        dispatch(getCurrent());
      } else toast.error(response.message);
    }
    if (flag === 'WISH_LIST') {
      const response = await apiupdateWishlist(pid);
      if (response.success) {
        dispatch(getCurrent());
        toast.success(response.message);
      } else toast.error(response.message);
    }
    if (flag === 'QUICK_VIEW') {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <DetailProduct
              isQuickView
              data={{ pid: productData?._id, category: productData?.category }}
              closeModal={() => dispatch(showModal({ isShowModal: false, modalChildren: null }))}
            />
          ),
        }),
      );
    }
  };
  // console.log(productData);
  return (
    <div className={clsx('w-full text-base px-[10px]', className)}>
      <div
        onClick={() => navigate(`/${productData?.category}/${productData?._id}/${productData?.title}`)}
        className="w-full border p-[15px] flex flex-col items-center cursor-pointer"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative select-none">
          {isShowOption && (
            <div className="absolute bottom-[-10px] justify-center  left-0 right-0 gap-2 flex animate-slide-top ">
              <span title="Quick View" onClick={(e) => handleClickOption(e, 'QUICK_VIEW')}>
                <SelectOption icon={<AiFillEye />} />
              </span>
              {current?.cart?.some((el) => el.product === productData._id.toString()) ? (
                <span title="Add to Cart">
                  <SelectOption icon={<BsCartCheckFill color="green" />} />
                </span>
              ) : (
                <span title="Add to Cart" onClick={(e) => handleClickOption(e, 'CART')}>
                  <SelectOption icon={<BsCartPlusFill />} />
                </span>
              )}
              <span title="Add Wishlist" onClick={(e) => handleClickOption(e, 'WISH_LIST')}>
                <SelectOption icon={<BsFillSuitHeartFill color={current?.wishlist?.some((i) => i._id === pid) ? 'red' : 'gray'} />} />
              </span>
            </div>
          )}
          <img
            src={
              productData?.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeEMFOioMvJppE99YJwiuJD94opPAdrUFq2dfcGPDjneZO0JA99t1ISxqRxwc2kGudTZc&usqp=CAU'
            }
            alt=""
            className="w-[274px] h-[274px] object-cover"
          />
          {!normal && <img src={isNew ? label : trending} alt="" className={`absolute top-[0] right-[0] object-cover w-[100px] h-[35px]`} />}
        </div>

        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRating)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Product));
