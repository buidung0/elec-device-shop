import clsx from 'clsx';
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa6';

function Question({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="my-3">
      <div
        onClick={toggleAnswer}
        className={clsx(
          !showAnswer
            ? 'cursor-pointer border bg-white font-bold py-3 px-4 rounded flex justify-between items-center text-gray-700'
            : 'flex justify-between cursor-pointer border bg-main text-white font-bold py-3 px-4 rounded items-center',
        )}
      >
        <h3>{question}</h3>
        {showAnswer ? <FaMinus /> : <FaPlus />}
      </div>
      {showAnswer && <p className="p-4 border">{answer}</p>}
    </div>
  );
}

export default Question;
