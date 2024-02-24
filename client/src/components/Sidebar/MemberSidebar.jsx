import React, { memo, Fragment, useState } from 'react';
import avatar from '../../assets/avatardefault.png';
import { memberSidebar } from '../../utils/constant';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { IoIosHome } from 'react-icons/io';
import { useSelector } from 'react-redux';

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 bg-blue-500 text-lg';
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-200 text-lg';

const MemberSidebar = () => {
  const { current } = useSelector((state) => state.user);

  return (
    <div className="fixed top-0 left-0 bg-white h-full py-4 w-[250px] flex-none select-none">
      <div className="flex flex-col justify-center items-center w-full py-4">
        <img src={current?.avatar || avatar} alt="logo" className="w-16 h-16 object-cover" />
        <small className="text-[15px]">{`${current.lastname} ${current.firstname}`}</small>
      </div>
      <div>
        {memberSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === 'SINGLE' && (
              <NavLink to={el.path} className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}>
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
          </Fragment>
        ))}
      </div>
      <div className="gap-2">
        <NavLink to={'/'} className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}>
          <span>
            <IoIosHome />
          </span>
          <span>Home</span>
        </NavLink>
      </div>
    </div>
  );
};

export default memo(MemberSidebar);
