import React, { memo } from 'react';

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  const handleButtonClick = (operation) => {
    if (operation === 'minus' && quantity > 1) {
      handleChangeQuantity('minus');
    } else if (operation === 'plus') {
      handleChangeQuantity('plus');
    }
  };

  return (
    <div className="flex items-center">
      <span className="p-2 border-r cursor-pointer border-black" onClick={() => handleButtonClick('minus')}>
        -
      </span>
      <input type="text" className="py-2 outline-none w-[50px] text-center" value={quantity} onChange={(e) => handleQuantity(e.target.value)} />
      <span className="p-2 border-l cursor-pointer border-black" onClick={() => handleButtonClick('plus')}>
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
