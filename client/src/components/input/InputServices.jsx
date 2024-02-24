import React, { memo } from 'react';
import clsx from 'clsx';

const InputServices = ({  disabled, register, errors, id, validate, type = 'text', placeholder, fullWidth, defaultValue, style, readOnly }) => {
  return (
    <div className={clsx('flex w-full h-[60px] flex-col', style)}>
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx('border-none bg-gray-100 placeholder:p-2 placeholder:text-gray-300', fullWidth && 'w-full', style)}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
      {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
    </div>
  );
};

export default memo(InputServices);
