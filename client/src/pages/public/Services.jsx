import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdTime, IoIosCall } from 'react-icons/io';
import { CiMail } from 'react-icons/ci';
import { BreadCrumb, Button, InputServices, Loading } from '../../components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { showModal } from '../../store/app/appSlice';
import { apiCreateService } from '../../apis';
import { useDispatch } from 'react-redux';

const Services = () => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    message: '',
  });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const changeValue = (e) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      message: e.target.value,
    }));
  };

  const HandleServices = async (data) => {
    const finalPayload = { ...data, ...payload };
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateService(finalPayload);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">Services</h3>
          <BreadCrumb category="services" title="Home" />
        </div>
      </div>

      <div className="w-main flex justify-between mt-8 m-auto">
        <iframe
          width="1220"
          height="500"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Rosemont+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div className="h-[50px]"></div>
      <div className="grid grid-cols-2 w-main mt-4 m-auto">
        <div className="col-span-1">
          <span>Sed vestibulum faucibus felis, sit amet facilisis tellus. Aliquam erat volutpat. Sed consectetur ipsum velit, quis rhoncus libero egestas eget.</span>
          <div className=" flex items-center gap-2 py-2">
            <span>
              <FaLocationDot color="red" />
            </span>
            <span>Address: 474 Ontario St Toronto, ON M4X 1M7 Canada</span>
          </div>
          <div className=" flex items-center gap-2 py-2">
            <span>
              <IoMdTime color="red" />
            </span>
            <span>Opening hours</span>
          </div>
          <div className=" flex items-start gap-2 py-1 flex-col px-5">
            <span>Mon-Fri : 11.00 - 20.00</span>
            <span>Sat: 10.00 - 20.00</span>
            <span>Sun: 19.00 - 20.00</span>
          </div>

          <div className=" flex items-center gap-2 py-2">
            <span>
              <CiMail color="red" />
            </span>
            <span>Email: support@tadathemes.com</span>
          </div>
          <div className=" flex items-center gap-2 py-2">
            <span>
              <IoIosCall color="red" />
            </span>
            <span>Phone: (+123)345 678 xxx</span>
          </div>
        </div>
        <div className="col-span-1">
          <form onSubmit={handleSubmit(HandleServices)}>
            <div className="flex w-full justify-between gap-2">
              <InputServices fullWidth register={register} errors={errors} id="name" style="mb-3" validate={{ required: 'Need fill this field' }} placeholder="Name" />
              <InputServices fullWidth register={register} errors={errors} id="phone" style="mb-3" validate={{ required: 'Need fill this field' }} placeholder="Phone" />
            </div>
            <InputServices fullWidth register={register} errors={errors} id="email" style="mb-3" validate={{ required: 'Need fill this field' }} placeholder="Email" />
            <textarea
              className="w-full border-none bg-gray-100 placeholder:p-2 placeholder:text-gray-300"
              placeholder="Message"
              id="message"
              rows={6}
              onChange={(e) => changeValue(e)}
            />
            <div className="flex justify-end">
              <Button style="rounded-md w-fit bg-main px-4 py-3 text-white" type="submit">
                SEND
              </Button>
            </div>
            <div className="w-full"></div>
          </form>
        </div>
      </div>

      <div className="w-full h-[100px]"></div>
    </div>
  );
};

export default Services;
