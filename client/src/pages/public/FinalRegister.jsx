import React, { useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import path from '../../utils/path';
import Swal from 'sweetalert2';

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'failed')
      Swal.fire('Oop!', 'Failed to Login', 'error').then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === 'success')
      Swal.fire('Congratulation !', 'Login success !', 'success').then(() => {
        navigate(`/${path.LOGIN}`);
      });
  }, []);
  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default memo(FinalRegister);
