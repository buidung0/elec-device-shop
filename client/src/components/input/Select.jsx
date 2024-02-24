import clsx from 'clsx';
import React, { memo } from 'react';

const Select = ({ label, options = [], register, errors, id, validate, style, fullWidth, defaultValue }) => {
  return (
    <div className={clsx('flex flex-col gap2', style)}>
      {label && (
        <label htmlFor={id} key={id}>
          {label}
        </label>
      )}
      <select defaultValue={defaultValue} className={clsx('form-select max-h-[42px]', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
        <option value="">-----CHOSE-----</option>
        {options?.map((el) => (
          <option value={el.code} key={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
    </div>
  );
};

export default memo(Select);
