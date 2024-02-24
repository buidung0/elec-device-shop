import React, { memo, useState } from 'react';
import { productInfoTabs } from '../../utils/constant';
import { Button, Votebar, VoteOptions, Comment } from '..';
import { renderStarFromNumber } from '../../utils/helper';
import { apiRatings } from '../../apis';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/app/appSlice';
import path from '../../utils/path';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProductInfomation = ({ totalRating, ratings, nameProduct, pid, reRender }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [activedTab, setActivedTab] = useState(1);

  const handleSubmitVoteOption = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert('Please fill all fields');
      return;
    }
    await apiRatings({ comment, star: score, pid, updatedAt: Date.now() });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    reRender();
  };

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: 'Login to Vote',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Go log in',
        title: 'Oops!',
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: <VoteOptions nameProduct={nameProduct} handleSubmitVoteOption={handleSubmitVoteOption} />,
        }),
      );
    }
  };

  return (
    <div className="select-none">
      <div className="flex items-center gap-2 relative bottom-[-1px] ">
        {productInfoTabs.map((el) => (
          <span
            key={el.id}
            className={`p-2  px-4 cursor-pointer ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">{productInfoTabs.some((el) => el.id === activedTab) && productInfoTabs.find((el) => el.id === activedTab)?.content}</div>

      <div className="flex flex-col py-8 w-main">
        <span className={`p-2  px-4 cursor-pointer bg-white border border-b-0`}>CUSTOMERS REVIEW</span>
        <div className="flex border">
          <div className="flex-4 flex items-center flex-col justify-center ">
            <span className="font-semibold text-2xl">{`${totalRating}/5`}</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(totalRating)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span className="text-sm">{`${ratings?.length} reviewers and commentors`}</span>
          </div>
          <div className="flex-6  p-4 flex flex-col justify-center">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <Votebar key={el} number={el + 1} ratingCount={ratings?.filter((i) => i.star === el + 1)?.length} ratingtotal={ratings?.length} />
              ))}
          </div>
        </div>
        <div className="flex p-4 items-center justify-center text-sm flex-col gap-2">
          <span>Do you wants to review this product ?</span>
          <Button handleOnClick={handleVoteNow}>Rating !!</Button>
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((el) => (
            <Comment key={el.id} star={el.star} updatedAt={el.updatedAt} comment={el.comment} name={`${el.postBy?.lastname} ${el.postBy?.firstname}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
/*
`dispatch(
  showModal({
    isShowModel: true,
    modalChildren: (
      <VoteOptions nameProduct={nameProduct} handleSubmitVoteOption={handleSubmitVoteOption} />
    ),
  }),
)`
*/
