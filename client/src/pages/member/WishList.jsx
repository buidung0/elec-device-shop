import { Button, Product } from '../../components';
import React from 'react';
import { useSelector } from 'react-redux';

const WishList = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b-blue-300 border-b">My Wish List</header>

      <div className="p-4 w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {current?.wishlist?.map((el) => (
          <div key={el._id} className="bg-white drop-shadow rounded-md flex flex-col gap-3 pt-3">
            <Product pid={el._id} productData={el} className="bg-white" />
            <div className="px-3">
              <Button>Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
