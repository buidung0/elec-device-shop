import React, { useState, useEffect, Fragment } from 'react';
import { BreadCrumb } from '../../components';
import { apiGetBlog } from '../../apis';
import moment from 'moment';
import withBase from '../../hocs/withBase';
import { useSelector } from 'react-redux';
import { FaLongArrowAltRight } from 'react-icons/fa';

const Blog = ({ navigate }) => {
  const [blogg, setBlogg] = useState([]);
  const getBlog = async () => {
    const response = await apiGetBlog({ limit: 3 });
    // console.log(response);
    if (response.success) {
      setBlogg(response.Blog);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">Blog</h3>
          <BreadCrumb category="Blog" title="Home" />
        </div>
      </div>
      <div className="w-main justify-between mt-8 m-auto grid grid-cols-8 grid-rows-2 gap-4">
        <div className="col-span-6 row-span-2">
          <div className="flex flex-col">
            {blogg.map((el) => (
              <div key={el.id} className="flex gap-4 px-4 py-3 ">
                <img
                  src={el.image}
                  alt="imageblog"
                  className="w-[420px] h-[280px] object-contain cursor-pointer"
                  onClick={() => navigate(`/detailblog/${el.category}/${el._id}/${el.title}`)}
                />
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-lg hover:text-red-600 cursor-pointer" onClick={() => navigate(`/detailblog/${el.category}/${el._id}/${el.title}`)}>
                    {el.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{'By ' + el.author + ' ' + moment(el.createdAt).format('DD/MM/YYYY')}</p>
                  <p className="font-semibold text-black line-clamp-6">{el.description}</p>
                  <label
                    className="text-red-500 cursor-pointer hover:text-black flex items-center gap-2 "
                    onClick={() => navigate(`/detailblog/${el.category}/${el._id}/${el.title}`)}
                  >
                    Read More
                    <FaLongArrowAltRight />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 row-span-1 border ">
          <h6 className="bg-main px-4 py-3 font-bold text-lg text-white ">RECENT ARTICLES</h6>
          {blogg.map((el) => (
            <div className="p-5 mb-[-10px]" key={el}>
              <ul key={el.id} className="flex flex-col">
                <li className="font-semibold text-[16px] hover:text-red-500 capitalize " onClick={() => navigate(`/detailblog/${el.category}/${el._id}/${el.title}`)}>
                  {el.title.toLowerCase()}
                </li>
                <li className="text-gray-500">{moment(el.createdAt).format('MMM DD, YYYY')}</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="col-span-2 row-span-1 ">
          <img src="https://blog.infraspeak.com/wp-content/uploads/2021/08/Maintenance-as-a-Service.jpeg" alt="img services" className="w-[292px] h-[160px]" />
        </div>
      </div>
      <div className="w-full h-[100px]"></div>
    </div>
  );
};

export default withBase(Blog);
