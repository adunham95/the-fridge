// @flow
import React from 'react';
import accountColors from '../../theme/accountColors.json';

type Props = {
  containerClass?: string,
  label?: string,
  value: string,
  placeholder?: string,
  onChange: (value: string) => void,
  id: string,
};
export const ColorPicker = ({
  label,
  value,
  id,
  onChange,
  containerClass = '',
}: Props) => {
  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex overflow-y-auto p-1">
        {accountColors.map((c: string) => (
          <button
            key={c}
            type="button"
            style={{ backgroundColor: c }}
            onClick={() => onChange(c)}
            className={`min-h-[2rem] min-w-[2rem] block mr-1 aspect-square rounded-full ring-2 ring-transparent ${
              value === c ? 'ring-gray-400' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};
