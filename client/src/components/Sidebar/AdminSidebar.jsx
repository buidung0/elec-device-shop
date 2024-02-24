import React, { memo, Fragment, useState } from 'react';
import logo from '../../assets/logo.png';
import { adminSidebar } from '../../utils/constant';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 bg-blue-500 text-lg';
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-200 text-lg';
const AdminSidebar = () => {
  const [actived, setActived] = useState([]);

  const handleShowTabs = (tabId) => {
    if (actived?.some((el) => el === tabId)) setActived((prev) => prev.filter((el) => el !== tabId));
    else setActived((prev) => [...prev, tabId]);
  };
  return (
    <div className=" bg-stone-50 h-full py-4 select-none">
      <Link to={'/'} className="flex flex-col justify-center items-center p-4 gap-4">
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <small>Admin Workspace</small>
      </Link>
      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === 'SINGLE' && (
              <NavLink to={el.path} className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}>
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === 'PARENT' && (
              <div className="flex flex-col text-lg" onClick={() => handleShowTabs(+el.id)}>
                <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {actived?.some((id) => +id === +el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle, 'pl-9')}
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
