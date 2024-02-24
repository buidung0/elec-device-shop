import React, { Fragment, memo, useEffect, useState } from 'react';
import { Banner, Sidebar, BestSeller, FeatureProduct, CustomSlider, DealDaily } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import { createSlug } from '../../utils/helper';
import { NavLink, createSearchParams, useNavigate } from 'react-router-dom';
import { apiGetBlog } from '../../apis';
import clsx from 'clsx';
import moment from 'moment';
import Slider from 'react-slick';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const { IoIosArrowForward } = icons;
const Home = () => {
  const navigate = useNavigate();
  const { newProducts } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.app);
  const { currentBlog } = useSelector((state) => state.blog);

  return (
    <>
      <div className="w-main flex mt-6">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProduct />
      </div>
      <div className="w-main my-8">
        <h3 className="text-[20px] py-[15px] border-b-2 border-main font-semibold">NEW ARRIVALS</h3>
        <div className=" mt-4 mx-[-10px] ">
          <CustomSlider products={newProducts} />
        </div>
      </div>
      <div className="w-main my-8">
        <h3 className="text-[20px] py-[15px] border-b-2 border-main font-semibold">HOT COLLECTIONS</h3>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {category
            ?.filter((el) => el.brand.length > 0)
            .map((el) => (
              <div key={el._id} className="w-[396px]">
                <div className="border flex p-4 gap-4 min-h-[202px]">
                  <img src={el?.image} className="flex-1 w-[144px] h-[129px]  object-cover" alt="category" />
                  <div className="flex-1 text-gray-700">
                    <h4 className="font-semibold uppercase ">{el?.title}</h4>
                    <ul className="text-sm">
                      {el?.brand.map((item) => (
                        <span
                          key={item}
                          className="flex gap-1 cursor-pointer hover:underline items-center text-gray-500"
                          onClick={() =>
                            navigate({
                              pathname: `/${el.title}`,
                              search: createSearchParams({ brand: item }).toString(),
                            })
                          }
                        >
                          <IoIosArrowForward size={14} />
                          <li>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-main my-8">
        <h3 className="text-[20px] py-[15px] border-b-2 border-main font-semibold">BLOG POSTS</h3>
        <div className="py-4">
          <>
            <Slider className="custom-slider" {...settings}>
              {currentBlog?.map((el) => (
                <Fragment key={el._id}>
                  <div className="flex flex-col gap-4">
                    <NavLink key={createSlug(el.title)} to={`/detailblog/${el.category}/${el._id}/${el.title}`} className={clsx('px-3')}>
                      <img src={el.image} alt="imagepost" className="w-full h-[258px]" />
                      <span className="font-semibold text-gray-900 text-center hover:text-main flex items-center justify-center py-4">{el.title}</span>
                    </NavLink>
                    <p className="text-gray-400 text-sm text-center">{moment(el.createdAt).format('MMM DD,YYYY') + ' By ' + el.author + ' '}</p>
                    <p className=" text-gray-700 line-clamp-6 text-center text-sm">{el.description}</p>
                  </div>
                </Fragment>
              ))}
            </Slider>
          </>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
