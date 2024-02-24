import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import path from './utils/path';
import { AdminLayout, CreateProduct, DashBoard, ManageOrder, ManageProduct, ManageUser } from './pages/admin';
import { Checkout, History, MemberLayout, Personal, WishList } from './pages/member';
import { Blog, DetailBlog, DetailCart, DetailProduct, FAQ, FinalRegister, Home, Login, Products, Public, ResetPassword, Services } from './pages/public';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart, Modal } from './components';
import { showCart } from './store/app/appSlice';
import { getCategory } from './store/app/asyncAction';
import ManageBlog from './pages/admin/ManageBlog';
import CreateBlog from './pages/admin/CreateBlog';
import { getCurrentBlog } from './store/blog/asyncAction';
import ManageServices from './pages/admin/ManageServices';

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getCurrentBlog());
  }, []);
  return (
    <div className=" font-main max-h-screen relative">
      {isShowCart && (
        <div className="absolute inset-0 bg-overlay z-50 flex justify-end" onClick={() => dispatch(showCart())}>
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.CHECK_OUT} element={<Checkout />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.DETAIL_PRODUCT_CATEGORY_PID_TITLE} element={<DetailProduct />} />
          <Route path={path.DETAIL_BLOG} element={<DetailBlog />} />
          <Route path={path.FAQs} element={<FAQ />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProduct />} />
          <Route path={path.CREATE_BLOG} element={<CreateBlog />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_SERVICES} element={<ManageServices />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_BLOG} element={<ManageBlog />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.MY_CART} element={<DetailCart />} />
          <Route path={path.WISH_LIST} element={<WishList />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
