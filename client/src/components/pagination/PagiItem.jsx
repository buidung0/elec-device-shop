import React, { memo } from 'react';
import clsx from 'clsx';
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom';

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      type="button"
      className={clsx(
        'flex items-center w-7 h-7 justify-center ',
        !Number(children) && 'items-end pt-3',
        Number(children) && 'items-center hover:rounded-full hover:bg-gray-100',
        +params.get('page') === +children && 'rounded-full bg-gray-300',
        !+params.get('page') && +children === 1 && 'rounded-full bg-gray-300',
      )}
      onClick={handlePagination}
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PagiItem);
