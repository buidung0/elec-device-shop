import React from 'react';
import { BreadCrumb, Question } from '../../components';
import { QaAs } from '../../utils/constant';

const FAQ = () => {
  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">FaQ</h3>
          <BreadCrumb category="FaQ" title="Home" />
        </div>
      </div>
      <div className="w-main flex justify-between m-auto flex-col">
        {QaAs.map((el) => (
          <div className='flex flex-col'>
            <Question question={el.question} answer={el.answer} />
          </div>
        ))}
      </div>

      <div className="w-full h-[100px]"></div>
    </div>
  );
};

export default FAQ;
