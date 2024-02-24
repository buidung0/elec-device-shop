import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Navigation, Footer, TopHeader } from '../../components';

const Public = () => {
  return (
    <div className="max-h-screen overflow-y-auto flex flex-col items-center ">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex justify-center flex-col items-center ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default memo(Public);
