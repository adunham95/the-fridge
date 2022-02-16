// @flow
import React from 'react';
import { UserPermissionDetails } from '../../models/UserPermission';
type Props = {
  onChange: (id: string) => void,
  selectedPermission: Array<string>,
  containerClass?: string,
};
export function GroupPermissions({
  onChange,
  selectedPermission = [],
  containerClass = '',
}: Props) {
  return (
    <div className={`pt-2 ${containerClass}`}>
      <h2 className="text-sm font-medium text-gray-700">Group Permissions</h2>
      <div className="flex flex-wrap">
        {Object.keys(UserPermissionDetails).map((key) => {
          const isChecked = selectedPermission.includes(key);
          return (
            <span key={key} className="w-1/2 sm:w-1/3 md:w-1/4 p-1">
              <input
                className="sr-only"
                type="checkbox"
                checked={isChecked}
                onChange={() => onChange(key)}
                id={key}
              />
              <label
                htmlFor={key}
                className={`p-2 block border bg-white h-full rounded transition cursor-pointer hover:border-brand-400 ${
                  isChecked
                    ? ' border-brand-300 shadow-md shadow-brand-200'
                    : 'border-gray-200'
                }`}
              >
                <span className=" text-base border-b block w-full border-grey-200">
                  {UserPermissionDetails[key].title}
                </span>
                <p className="text-sm">
                  {UserPermissionDetails[key].description}
                </p>
              </label>
            </span>
          );
        })}
      </div>
    </div>
  );
}
