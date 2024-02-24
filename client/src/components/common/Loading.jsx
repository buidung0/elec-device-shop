import React, { memo } from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="z-10000">
      <HashLoader color="#ee3131" />
    </div>
  );
};

export default memo(Loading);
