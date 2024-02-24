import React, { memo} from 'react';
import clsx from 'clsx';

const InputField = ({value,setValue,nameKey,type,invalidFields,setInvalidFields,style,fullWidth,placeholder ,isHideLabel}) => {
  const inputType = type === 'password' ? 'password' : 'text';
  return (
    <div className={clsx('relative flex flex-col mb-2 ', fullWidth && 'w-full')}>
      {value && value?.trim() != '' && (
        <label
          className="text-[12px] absolute animate-slide-top-sm top-0 left-[9px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {!isHideLabel && nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={inputType}
        name=""
        alt=""
        className={clsx('px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm outline-none', style)}
        placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main text-[10px]">{invalidFields.find((el) => el.name === nameKey)?.message}</small>
      )}
    </div>
  );
};

export default memo(InputField);
