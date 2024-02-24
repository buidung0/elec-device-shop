import React, { useState, useEffect, useCallback, memo } from 'react';
import { InputField, Button, Loading } from '../../components';
import { apiLogin, apiRegister, apiForgotPassword, apiFinalRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import path from '../../utils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/app/appSlice';
import background from '../../assets/backgroundlogin.jpg';
import { toast } from 'react-toastify';
import { validate } from '../../utils/helper';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: '',
  });
  const [searchParams] = useSearchParams();
  const [invalidFields, setInvalidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '',
    });
  };
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    console.log(response);
    if (response.success) {
      // setIsForgotPassword(false);
      toast.success(response.message, { theme: 'colored' });
    } else {
      toast.info(response.message, { theme: 'colored' });
    }
  };
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  //submit
  // console.log(validate(payload));
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        try {
          dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
          const response = await apiRegister(payload);
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
          if (response.success) {
            setVerifyEmail(true);
          } else {
            Swal.fire('Oops!', response.message, 'error');
          }
        } catch (error) {
          console.error('Error occurred:', error);
          Swal.fire('Error', 'An error occurred while registering', 'error');
        }
      } else {
        try {
          const rs = await apiLogin(data);
          if (rs.success) {
            dispatch(login({ isLoggedIn: true, token: rs.accessToken, userData: rs.userData }));
            searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`);
          } else {
            Swal.fire('Error', rs.message, 'error');
          }
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
    }
  }, [payload, isRegister]);
  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire('Login Succeeded', response.message, 'success').then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else {
      Swal.fire('Oops!', response.message, 'error');
    }
    setVerifyEmail(false);
    setToken('');
  };
  return (
    <div className="w-screen h-screen relative">
      {verifyEmail && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col items-center justify-center">
          <div className="bg-white w-[500px] rounded-md p-8">
            <h4 className="">Please check ur enter code in email to verify account:</h4>
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className="p-2 border rounded-md outline-none " placeholder="Enter code" />
            <button type="button" onClick={finalRegister} className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4">
              Submit
            </button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute top-0 bottom-0 right-0 left-0 animate-slide-right bg-white flex flex-col items-center py-8 z-50">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">enter your email:</label>
            <input
              type="text "
              id="email"
              className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
              placeholder="Ex: Example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end w-full gap-4">
              <Button name="Submit" handleOnClick={handleForgotPassword} style={clsx('px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2')} />
              <Button name="Back" handleOnClick={() => setIsForgotPassword(false)} style={clsx('px-4 py-2 rounded-md text-white bg-orange-500 text-semibold my-2')} />
            </div>
          </div>
        </div>
      )}
      <img src={background} className="w-full h-full object-cover" alt="" />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="p-8 bg-white rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8 flex items-center flex-col">{isRegister ? 'Register' : 'Login'}</h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField value={payload.firstname} setValue={setPayload} nameKey="firstname" invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
              <InputField value={payload.lastname} setValue={setPayload} nameKey="lastname" invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
            </div>
          )}
          <InputField value={payload.email} setValue={setPayload} nameKey="email" invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
          {isRegister && <InputField value={payload.mobile} setValue={setPayload} nameKey="mobile" invalidFields={invalidFields} setInvalidFields={setInvalidFields} />}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button handleOnClick={handleSubmit} fw>
            {isRegister ? 'Register' : 'Login'}
          </Button>
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsForgotPassword(true)}>
                Forgot your Account?
              </span>
            )}
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsRegister(true)}>
                Create Account
              </span>
            )}
            {isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer w-full text-center" onClick={() => setIsRegister(false)}>
                Return
              </span>
            )}
          </div>
          <Link to={`/${path.HOME}`} className="text-blue-500 hover:underline cursor-pointer w-full text-center block text-sm">
            Go home?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
