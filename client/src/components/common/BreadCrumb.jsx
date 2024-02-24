import React, { memo } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const BreadCrumb = ({ title, category }) => {
  const routes = [
    { path: '/', breadcrumb: 'Home' },
    { path: '/:category', breadcrumb: category },
    { path: '/:category/:pid/:title', breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center gap-1">
      <>
        {breadcrumbs
          ?.filter((el) => !el.match.route === false)
          .map(({ match, breadcrumb }, index, sell) => (
            <Link className="flex items-center hover:text-main gap-1" key={match.pathname} to={match.pathname}>
              <span className="capitalize">{breadcrumb}</span>
              {index !== sell.length - 1 && <IoIosArrowForward />}
            </Link>
          ))}
      </>
    </div>
  );
};

export default memo(BreadCrumb);
