import React, { useEffect } from 'react';
import { formatDate } from '../../util/formatData';

interface IProps {
  date: string;
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

interface IUnits {
  [key: Intl.RelativeTimeFormatOptions]: number;
}

const units: IUnits = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

function Dateformat({ date }: IProps) {
  const getRelativeTime = (d1: Date, d2: Date = new Date()) => {
    const elapsed = d1 - d2;

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const u in units) {
      if (Math.abs(elapsed) > units[u] || u == 'second') {
        const distance = Math.round(elapsed / units[u]);
        if (distance < -1 && u === 'month') {
          return formatDate(date, true, false);
        } else {
          return rtf.format(distance, u);
        }
      }
    }
  };

  return <span>{getRelativeTime(new Date(date))}</span>;
}

export default Dateformat;
