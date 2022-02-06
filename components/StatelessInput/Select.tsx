// @flow
import * as React from 'react';
type Props = {
  containerClass?: string,
  label?: string,
  value: string,
  onChange: (value: string) => void,
  id: string,
  defaultOption?: string,
  options: Array<{
    value: string,
    label: string,
  }>,
};
export function Select({
  label,
  value,
  id,
  defaultOption,
  options,
  onChange,
  containerClass = '',
}: Props) {
  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          <p>{label}</p>
        </label>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full py-2 px-3 pr-9 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
