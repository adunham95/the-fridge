// @flow
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RouteNames } from '../../models/Routes';

interface ICrumb {
  path: string;
  title: string;
  current: boolean;
}

export function BreadCrumb() {
  const { pathname, query } = useRouter();
  const [crumbs, setCrumbs] = useState<Array<ICrumb>>([]);

  function getQueryParams(d: string) {
    if (d === 'orgID') {
      return query.orgID;
    }
    if (d === 'groupID') {
      return query.groupID;
    }
    return d;
  }

  useEffect(() => {
    console.log(query);
    const data = pathname.split('/').filter((p) => p !== '');
    const allRoutes = data.map((d, i) => {
      const path = `/${data.slice(0, i + 1).join('/')}`;
      const generatedPathName = `/${[
        ...data.slice(0, i),
        getQueryParams(d),
      ].join('/')}`;
      console.log(path);
      return {
        path: generatedPathName,
        title: RouteNames[path],
        current: path === pathname,
      };
    });
    console.log(allRoutes);
    setCrumbs(allRoutes);
  }, [pathname]);

  return (
    <div className="flex py-1 text-xs">
      <ol className='class="inline-flex items-center space-x-1 md:space-x-3"'>
        {crumbs.map((c, i) => (
          <li className="inline-flex items-center" key={c.path}>
            <svg
              className={
                i > 0 ? `w-6 h-6 text-brand-400` : 'text-transparent w-0 h-6'
              }
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <Link href={c.path} passHref>
              <a
                className={`ml-1 text-sm font-medium  md:ml-2 hover:text-brand-700 ${
                  c.current ? 'text-brand-500' : 'text-brand-400'
                }`}
              >
                {c.title}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
