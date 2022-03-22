// @flow
import Link from 'next/link';
import * as React from 'react';
import { ERoutes } from '../../models/Routes';
import Icon, { EIcons } from '../Icons';
type Props = {
  href: ERoutes,
  title: string,
  icon?: EIcons,
};
export function DashboardLink({ href, title, icon }: Props) {
  return (
    <Link href={href} passHref>
      <a className="w-1/2 sm:w-1/3 lg:w-1/4 pr-1 pb-1 group">
        <div className="p-2 block border bg-white h-full rounded transition cursor-pointer group-hover:border-brand-400">
          {icon && (
            <div className="text-brand-400 max-h-[75px] flex justify-center group-hover:text-brand-600 p-1">
              <Icon name={icon} />
            </div>
          )}
          <p className="w-full text-center text-black group-hover:text-brand-700">
            {title}
          </p>
        </div>
      </a>
    </Link>
  );
}
