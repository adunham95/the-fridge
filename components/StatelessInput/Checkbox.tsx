import React from 'react';
interface IProps {
  id: string;
  value: boolean;
  label?: string | JSX.Element | JSX.Element[];
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: boolean) => void;
  containerClass?: string;
}

export const Checkbox = (props: IProps) => {
  const {
    value,
    label,
    id,
    required,
    onChange,
    containerClass = '',
    placeholder = '',
  } = props;
  return (
    <div className={`flex flex-row items-center ${containerClass}`}>
      <input
        id={id}
        checked={value}
        type={'checkbox'}
        required={required}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        placeholder={placeholder}
        className="text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border shadow h-[1.5em] w-[1.5em]"
      />
      {label && (
        <label
          htmlFor={id}
          className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal ml-2 text-left"
        >
          {label}
        </label>
      )}
    </div>
  );
};
