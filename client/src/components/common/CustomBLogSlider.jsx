import React from 'react';
import { Blog } from '../../pages/public';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const CustomBLogSlider = ({ blog }) => {
  return (
    <>
      {blog && (
        <Slider className="custom-slider" {...settings}>
          {blog?.map((el, index) => (
            <Blog key={index} pid={el._id} productData={el}  normal={normal} />
          ))}
        </Slider>
      )}
    </>
  );
};

export default CustomBLogSlider;
