import React, { memo } from 'react';
import usePagination from '../../hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import PagiItem from './PagiItem';

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get('page'));
  // console.log(params.get('page'));
  const range = () => {
    const currentPage = +params.get('page');
    const pageSize = +import.meta.env.VITE_LIMIT || 10;
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-full justify-between items-center">
      {!+params.get('page') ? (
        <span className="text-sm italic">{`Show ${Math.min(totalCount, 1)}-${Math.min(+import.meta.env.VITE_LIMIT_PRODUCT, totalCount) || 10} of ${totalCount}`}</span>
      ) : (
        ''
      )}
      {+params.get('page') ? <span className="text-sm italic">{`Show ${range()} of ${totalCount}`}</span> : ''}

      <div className="flex items-center">
        {pagination?.map((el) => (
          <PagiItem key={el}>{el}</PagiItem>
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);
