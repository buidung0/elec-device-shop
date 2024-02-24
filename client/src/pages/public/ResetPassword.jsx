import React, { useState } from 'react';
import { Button } from '../../components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis';
import { toast } from 'react-toastify';
import clsx from 'clsx';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      // setIsForgotPassword(false);
      toast.success(response.message, { theme: 'colored' });
    } else {
      toast.info(response.message, { theme: 'colored' });
    }
  };
  return (
    <div className="top-0 bottom-0 right-0 left-0 animate-slide-right bg-white flex flex-col items-center py-8 z-50">
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Enter your Password:</label>
        <input
          type="text "
          id="email"
          className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-end w-full gap-4">
          <Button name="Submit" handleOnClick={handleResetPassword} style={clsx('px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2')} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
