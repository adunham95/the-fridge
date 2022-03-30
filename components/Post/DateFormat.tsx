import React from 'react';
import { formatDate } from '../../util/formatData';

interface IProps {
  date: string;
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

interface IUnits {
  [key: string]: number;
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
    const elapsed = d1.getTime() - d2.getTime();

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const u in units) {
      if (Math.abs(elapsed) > units[u] || u == 'second') {
        const distance = Math.round(elapsed / units[u]);
        if (distance < -1 && u === 'month') {
          return formatDate(date, true, false);
        } else {
            //eslint-disable-next-line
            const unit: Intl.RelativeTimeFormatUnit = u as Intl.RelativeTimeFormatUnit; 
            return rtf.format(distance, unit);
        }
      }
    }
  };

  return <span>{getRelativeTime(new Date(date))}</span>;
}

export default Dateformat;
