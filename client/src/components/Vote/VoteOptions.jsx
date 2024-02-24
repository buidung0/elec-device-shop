import React, { memo, useRef, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { voteOptions } from '../../utils/constant';
import { AiFillStar } from 'react-icons/ai';
import Button from '../../components/buttons/Button';

const VoteOptions = ({ nameProduct, handleSubmitVoteOption }) => {
  const modalRef = useRef();
  const [choosenScore, setChoosenScore] = useState(null);
  const [comment, setComment] = useState('');
  const [score, setScore] = useState(null);

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);
  return (
    <div ref={modalRef} className="bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center rounded-md" onClick={(e) => e.stopPropagation()}>
      <img src={logo} alt="logo" className="w-[300px] object-contain my-8" />
      <h2 className="text-center text-medium text-lg">{`Voting product ${nameProduct}`}</h2>
      <textarea
        className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
        placeholder="type something"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4 ">
        <p>Feel about product?</p>
        <div className="flex items-center justify-center gap-4">
          {voteOptions.map((el) => (
            <div
              key={el.id}
              className="w-[100px] h-[100px] bg-gray-100  cursor-pointer rounded-md p-4 flex justify-center items-center flex-col gap-2"
              onClick={() => {
                setChoosenScore(el.id);
                setScore(el.id);
              }}
            >
              {Number(choosenScore) && choosenScore >= el.id ? <AiFillStar color="orange" /> : <AiFillStar color="gray" />}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button fw handleOnClick={() => handleSubmitVoteOption({ comment, score })}>
        Summit
      </Button>
    </div>
  );
};

export default memo(VoteOptions);
