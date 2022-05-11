import Head from 'next/head';
import React from 'react';
import { Globals } from '../../models/Global';

interface ILegalLayoutProps {
  pageName: string;
  children: React.ReactNode;
}

export const LegalLayout = ({ pageName, children }: ILegalLayoutProps) => {
  return (
    <div className="prose container mx-auto p-2">
      <Head>
        <title>
          {pageName} | {Globals.NAME}
        </title>
      </Head>
      {children}
    </div>
  );
};
