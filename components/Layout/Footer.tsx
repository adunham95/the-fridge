import Link from 'next/link';
import React from 'react';
import { ERoutes, RouteNames } from '../../models/Routes';

const legalLinks = [ERoutes.TOS, ERoutes.PRIVACY_POLICY];

const Footer = () => {
  return (
    <footer className="p-4 md:flex md:items-center md:justify-between md:p-6 h-[100px] md:h-[60px]">
      <span className="text-sm text-gray-500 sm:text-center ">
        © {new Date().getFullYear()} The Fridge. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500  sm:mt-0">
        {legalLinks.map((link) => (
          <li key={link}>
            <Link passHref href={link}>
              <a className="mr-4 hover:underline md:mr-6 ">
                {RouteNames[link]}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
