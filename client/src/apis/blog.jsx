import axios from "../axios";

export const apiGetBlog = (params) =>
  axios({
    url: "/blog",
    method: "get",
    params,
  });
export const apiGetOneBlog = (bid) =>
  axios({
    url: "/blog/one/" + bid,
    method: "get",
  });

export const apiCreateBlog = (data) =>
  axios({
    url: "/blog/",
    method: "post",
    data,
  });
export const apiUpdateBlog = (data, bid) =>
  axios({
    url: "/blog/update/" + bid,
    method: "put",
    data,
  });
export const apiDeleteBlog = (bid) =>
  axios({
    url: "/blog/" + bid,
    method: "delete",
  });

export const apiLikeBlog = (bid) =>
  axios({
    url: "/blog/likes/" + bid,
    method: "put",
  });

export const apiDislikeBlog = (bid) =>
  axios({
    url: "/blog/dislikes/" + bid,
    method: "put",
  });

export const apiCreateService = (data) =>
  axios({
    url: "/services",
    method: "post",
    data,
  });

export const apiGetService = (data) =>
  axios({
    url: "/services",
    method: "get",
    data,
  });
