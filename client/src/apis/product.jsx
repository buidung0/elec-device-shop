import axios from '../axios';

export const apiGetProduct = (params) =>
  axios({
    url: '/product',
    method: 'get',
    params,
  });

export const apiProduct = (pid) =>
  axios({
    url: '/product/' + pid,
    method: 'get',
  });

export const apiRatings = (data) =>
  axios({
    url: '/product/ratings',
    method: 'put',
    data,
  });
export const apiCreateProduct = (data) =>
  axios({
    url: '/product/',
    method: 'post',
    data,
  });
export const apiUpdateProduct = (data, pid) =>
  axios({
    url: '/product/' + pid,
    method: 'put',
    data,
  });
export const apiDeleteProduct = (pid) =>
  axios({
    url: '/product/' + pid,
    method: 'delete',
  });
export const apiAddVariants = (data, pid) =>
  axios({
    url: '/product/variants/' + pid,
    method: 'put',
    data,
  });
export const apiCreateOrder = (data) =>
  axios({
    url: '/order/',
    method: 'post',
    data,
  });
export const apiGetOrder = (params) =>
  axios({
    url: '/order/admin',
    method: 'get',
    params,
  });
export const apiGetUserOrder = (params) =>
  axios({
    url: '/order/',
    method: 'get',
    params,
  });
