import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector } from 'react-redux';
import { MemberSidebar } from '../../components';

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);

  if (!isLoggedIn || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }

  return (
    <div className="flex">
      <div className="flex-none">
        {/* The sidebar is now fixed */}
        <MemberSidebar />
      </div>
      <div className="flex-auto bg-gray-100 min-h-screen overflow-y-auto pl-[250px]">
        {/* Use 'pl-[250px]' to create space for the fixed sidebar */}
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
