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
  type?: 'textarea' | 'text' | 'password',
  required?: boolean,
};
export const Input = ({
  label,
  placeholder = '',
  value,
  id,
  onChange,
  required = false,
  containerClass = '',
  className = '',
  type = 'text',
}: Props) => {
  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={`relative rounded-md shadow-sm ${label && 'mt-1 '}`}>
        {type === 'textarea' ? (
          <textarea
            name={id}
            id={id}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            className={`focus:ring-brand-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
          />
        ) : (
          <input
            type={type}
            name={id}
            id={id}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`focus:ring-brand-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
          />
        )}
      </div>
    </div>
  );
};
