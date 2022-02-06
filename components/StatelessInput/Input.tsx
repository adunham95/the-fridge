// @flow
import * as React from 'react';
type Props = {
  containerClass?: string,
  label?: string,
  value: string,
  placeholder?: string,
  onChange: (value: string) => void,
  id: string,
  type?: 'textarea' | 'text' | 'password',
};
export const Input = ({
  label,
  placeholder = '',
  value,
  id,
  onChange,
  containerClass = '',
  type = 'text',
}: Props) => {
  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        {type === 'textarea' ? (
          <textarea
            name={id}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="focus:ring-brand-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        ) : (
          <input
            type="text"
            name={id}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="focus:ring-brand-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        )}
      </div>
    </div>
  );
};
