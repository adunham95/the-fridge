// @flow
import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path/posix';
import React, { useEffect, useState } from 'react';
import { RouteNames } from '../../models/Routes';

interface ICrumb {
  path: string;
  title: string;
  current: boolean;
}

export function BreadCrumb() {
  const { pathname } = useRouter();
  const [crumbs, setCrumbs] = useState<Array<ICrumb>>([]);

  useEffect(() => {
    const data = pathname.split('/').filter((p) => p !== '');
    const allRoutes = data.map((d, i) => {
      const path = `/${data.slice(0, i + 1).join('/')}`;
      return { path, title: RouteNames[path], current: path === pathname };
    });
    setCrumbs(allRoutes);
  }, [pathname]);

  return (
    <div className="flex py-1 text-xs">
      {crumbs.map((c, i) => (
        <>
          {i > 0 && <span className="px-1">\</span>}
          <Link key={c.path} href={c.path} passHref>
            <a
              className={`px-1 m-1 border-b border-transparent hover:border-brand-400 ${
                c.current && 'border-brand-400'
              }`}
            >
              {c.title}
            </a>
          </Link>
        </>
      ))}
    </div>
  );
}
