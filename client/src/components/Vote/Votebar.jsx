import React, { memo, useRef, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';

const Votebar = ({ number, ratingCount, ratingtotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingtotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingtotal]);
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className=" w-[75%] ">
        <div className="w-full h-[6px] bg-gray-300 rounded-l-full rounded-r-full relative">
          <div className="absolute inset-0 bg-red-500 right-8" ref={percentRef}></div>
        </div>
      </div>
      <div className="w-[15%] text-xs text-400 flex justify-end gap-2 ">{`${ratingCount || 0} reviewer`}</div>
    </div>
  );
};

export default memo(Votebar);
