import React, { useState, useEffect, memo } from 'react';
import icons from '../../utils/icons';
import moment from 'moment';
import { apiGetProduct } from '../../apis/product';
import { renderStarFromNumber, formatMoney } from '../../utils/helper';
import { secondsToHms } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getDealDaily } from '../../store/products/ProductSlice';
import CountDown from '../common/CountDown';

const { AiFillStar, AiOutlineMenu } = icons;
let idInterval;
const DealDaily = () => {
  const dispatch = useDispatch();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expire, setExpire] = useState(false);
  const { dealDaily } = useSelector((state) => state.products);
  const fetchDailyDeal = async () => {
    //
    const response = await apiGetProduct({ sort: '-totalRating', limit: 20 });
    if (response.success) {
      const prdt = response.products[Math.round(Math.random() * 20)];
      dispatch(
        getDealDaily({
          data: prdt,
          time: Date.now() + 24 * 60 * 60 * 1000,
        }),
      );
    }
  };
  useEffect(() => {
    if (dealDaily && dealDaily.time) {
      const deltaTime = dealDaily.time - Date.now();
      const number = secondsToHms(deltaTime);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    }
  }, [dealDaily]);
  // useEffect(() => {
  //   fetchDailyDeal();
  //   console.log(dailyDeal);
  // }, []);
  useEffect(() => {
    if (expire) {
      idInterval && clearInterval(idInterval);
      if (moment(moment(dealDaily?.time).format('MM/DD/YYYY')).isBefore(moment())) fetchDailyDeal();
    }
  }, [expire]);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpire(!expire);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expire]);

  return (
    <div className="w-full border flex-auto select-none">
      <div className="flex justify-between items-center p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#dd1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-center text-gray-700">Daily Deals</span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center object-contain gap-2 px-4">
        <img
          src={
            dealDaily?.data?.thumb ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeEMFOioMvJppE99YJwiuJD94opPAdrUFq2dfcGPDjneZO0JA99t1ISxqRxwc2kGudTZc&usqp=CAU'
          }
          alt=""
          className="w-full object-contain"
        />
        <span className="line-clamp-1 text-center">{dealDaily?.data?.title}</span>
        <span className="flex h-4">
          {renderStarFromNumber(dealDaily?.data?.totalRating, 20)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <span>{`${formatMoney(dealDaily?.data?.price)} VND`}</span>
      </div>
      <div className="p-4 mt-8 ">
        <div className="flex justify-center items-center gap-2 mb-4">
          <CountDown unit={'Hours'} number={hour} />
          <CountDown unit={'Minute'} number={minute} />
          <CountDown unit={'Second'} number={second} />
        </div>
        <button className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2" type="button">
          <AiOutlineMenu />
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
