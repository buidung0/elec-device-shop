import React, { memo } from 'react';
import icons from '../../utils/icons';

const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full select-none">
      <div className="h-[103px] bg-main w-full flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">SIGN UP TO NEWSLETTER</span>
            <small className="text-[13px] text-gray-300">Subscribe now and receive weekly newsletter</small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              type="text"
              placeholder="Email Address"
              className="p-4 pr-0 rounded-l-full w-full bg-[#f04646] outline-none text-gray-50 placeholder:text-gray-200 placeholder:opacity-50 focus:outline-none"
            />
            <div className="h-[56px] w-[56px] bg-[#f04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex ">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">ABOUT US</h3>
            <span>
              <span>Address: </span>
              <span className="opacity-70">474 Ontario St Toronto, ON M4X 1M7 Canada</span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">tadathemes@gmail.com</span>
            </span>
            <span></span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">INFORMATION</h3>
            <a href="#" className="hover:underline cursor-pointer">
              Typography
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              Gallery
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              Store Location
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              Today's Deals
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              Contact
            </a>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">WHO WE ARE</h3>
            <a href="#" className="hover:underline cursor-pointer">
              Help
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              Free Shipping
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              FAQs
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              Return & Exchange
            </a>
            <a href="#" className="hover:underline cursor-pointer">
              Testimonials
            </a>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">#DIGITALWORLDSTORE</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
