import { useEffect, useState } from 'react';
import generatePalette from '../util/generatePalette';

interface IPalletList {
  [key: string]: string;
}

const defaultPalette = {
  '50': '#f7f6f9',
  '100': '#efedf2',
  '200': '#d6d2e0',
  '300': '#bdb7cd',
  '400': '#8c81a7',
  '500': '#5b4b81',
  '600': '#524474',
  '700': '#443861',
  '800': '#372d4d',
  '900': '#2d253f',
};

export function usePallette(color: string) {
  const [colorPalette, setColorPalette] = useState<IPalletList>(defaultPalette);

  useEffect(() => {
    const pallette = generatePalette(color);
    setColorPalette(pallette.colors);
  }, [color]);

  return { colorPalette, setColorPalette };
}
