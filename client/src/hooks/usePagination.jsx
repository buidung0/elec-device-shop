import { useMemo } from 'react';
import { generateRange } from '../utils/helper';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pagesize = +import.meta.env.VITE_LIMIT || 10;
    const paginationCount = Math.ceil(+totalProductCount / pagesize);

    const a = +siblingCount + 5;

    if (paginationCount <= a) {
      return generateRange(1, paginationCount);
    }

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <PiDotsThreeOutlineFill />, ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftEnd = generateRange(1, 5);
      return [...leftEnd, <PiDotsThreeOutlineFill />, paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const midRange = generateRange(siblingLeft, siblingRight);
      return [1, <PiDotsThreeOutlineFill />, ...midRange, <PiDotsThreeOutlineFill />, paginationCount];
    }
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArray;
};
export default usePagination;
