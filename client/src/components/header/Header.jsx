import React, { Fragment, memo, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import icons from '../../utils/icons';
import { Link } from 'react-router-dom';
import path from '../../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user/userSlice';
import { showCart } from '../../store/app/appSlice';

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
const Header = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  useEffect(() => {
    const handleClickOutOption = (e) => {
      const profile = document.getElementById('profile');

      if (!profile?.contains(e.target)) setIsShowOption(false);
    };

    document.addEventListener('click', handleClickOutOption);

    return () => {
      document.removeEventListener('click', handleClickOutOption);
    };
  }, []);

  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px] select-none">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px] ">
        <div className="flex flex-col px-6 border-r items-center ">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold ">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 px-6 items-center">
            <MdEmail color="red" />
            <span className="font-semibold "> SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div onClick={() => dispatch(showCart())} className="flex items-center px-6 border-r justify-center gap-2 cursor-pointer">
              <BsHandbagFill color="red" />
              <span>{`${current?.cart.length || 0} items(s)`}</span>
            </div>
            <div className="flex items-center justify-center px-6 gap-2 cursor-pointer relative" onClick={(e) => setIsShowOption((prev) => !prev)} id="profile">
              <FaUserCircle color="red" />
              <span>Profile</span>
              {isShowOption && (
                <div className="absolute top-full left-[16px] flex flex-col min-w-[160px] border bg-white py-2 rounded-md" onClick={(e) => e.stopPropagation()}>
                  <Link to={`${path.MEMBER}/${path.PERSONAL}`} className="p-2 hover:bg-sky-100 w-full">
                    Personal
                  </Link>
                  <hr color="red" />
                  {+current?.role === 0 && (
                    <Link to={`${path.ADMIN}/${path.DASHBOARD}`} className="p-2 hover:bg-sky-100 w-full">
                      Admin Workspace
                    </Link>
                  )}
                  <hr />
                  <span className="p-2 hover:bg-sky-100 w-full" onClick={() => dispatch(logout())}>
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
