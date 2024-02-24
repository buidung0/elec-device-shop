import React, { memo } from 'react';
import { renderStarFromNumber, formatMoney } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

const ProDuctCart = ({ totalRating, title, image, price, pid, category }) => {
  const navigate = useNavigate();
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px] cursor-pointer select-none" onClick={() => navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}>
      <div className="w-full flex border">
        <img src={image} alt="products" className="w-[120px] object-contain flex p-4" />
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">{title?.toLowerCase()}</span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRating, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span>{`${formatMoney(price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProDuctCart);
