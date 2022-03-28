// @flow
import * as React from 'react';
type Props = {
  checked: boolean,
  onClick: (id: string) => void,
  id: string,
  name: string,
};
export function SelectedGroup({ checked, onClick, id, name }: Props) {
  return (
    <span className="inline-flex mr-1">
      <input
        type="checkbox"
        id={`${id}-value`}
        checked={checked}
        onChange={() => onClick(id)}
        className="hidden peer"
      />
      <label
        className="peer-checked:bg-brand-500 peer-checked:bg-opacity-100 bg-brand-400 bg-opacity-50 text-white p-1 rounded text-sm"
        htmlFor={`${id}-value`}
      >
        {name}
      </label>
    </span>
  );
}
