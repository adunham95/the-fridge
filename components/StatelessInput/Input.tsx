// @flow
import * as React from 'react';
type Props = {
  containerClass?: string,
  className?: string,
  label?: string,
  value: string,
  placeholder?: string,
  onChange: (value: string) => void,
  id: string,
  type?: React.HTMLInputTypeAttribute | 'textarea',
  required?: boolean,
  disabled?: boolean,
};
export const Input = ({
  label,
  placeholder = '',
  value,
  id,
  onChange,
  required = false,
  disabled = false,
  containerClass = '',
  className = '',
  type = 'text',
}: Props) => {
  const getInputType = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={id}
            id={id}
            placeholder={placeholder}
            value={value}
            required={required}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className={`focus:ring-brand-500 disabled:text-opacity-50 invalid:ring-rose-400 ring-transparent ring-2 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
          />
        );
      default:
        return (
          <input
            type={type}
            name={id}
            id={id}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`focus:ring-brand-500 disabled:text-opacity-50 invalid:ring-rose-400 ring-transparent ring-2 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
          />
        );
    }
  };

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={`relative rounded-md shadow-sm ${label && 'mt-1 '}`}>
        {getInputType()}
      </div>
    </div>
  );
};
