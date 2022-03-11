// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import colorNamer from 'color-namer';

export type Palette = {
  [key: string]: {
    [key: number]: string,
  },
};

export type PaletteDetails = {
  name: string,
  colors: {
    [key: number]: string,
  },
};
type Rgb = {
  r: number,
  g: number,
  b: number,
};

function hexToRgb(hex: string): Rgb | null {
  const sanitizedHex = hex.replaceAll('##', '#');
  const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    sanitizedHex,
  );

  if (!colorParts) {
    return null;
  }

  const [, r, g, b] = colorParts;

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getTextColor(color: string): '#FFF' | '#333' {
  const rgbColor = hexToRgb(color);

  if (!rgbColor) {
    return '#333';
  }

  const { r, g, b } = rgbColor;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 120 ? '#FFF' : '#333';
}

function lighten(hex: string, intensity: number): string {
  const color = hexToRgb(`#${hex}`);

  if (!color) {
    return '';
  }

  const r = Math.round(color.r + (255 - color.r) * intensity);
  const g = Math.round(color.g + (255 - color.g) * intensity);
  const b = Math.round(color.b + (255 - color.b) * intensity);

  return rgbToHex(r, g, b);
}

function darken(hex: string, intensity: number): string {
  const color = hexToRgb(hex);

  if (!color) {
    return '';
  }

  const r = Math.round(color.r * intensity);
  const g = Math.round(color.g * intensity);
  const b = Math.round(color.b * intensity);

  return rgbToHex(r, g, b);
}

function padZero(str: string, len?: number) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export function invertColor(hex: string) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

export function getColorName(color: string): string {
  const { name } = colorNamer(`#${color}`.replace('##', '#')).ntc[0];
  const sanitizedName = name
    .replace(/['/]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  return sanitizedName;
}

export default function (
  baseColor: string,
  palletName?: string,
): PaletteDetails {
  const name = palletName ? palletName : getColorName(baseColor);

  // eslint-disable-next-line prefer-const
  let response: PaletteDetails = {
    name,
    colors: {
      500: `#${baseColor}`.replace('##', '#'),
    },
  };

  const intensityMap: {
    [key: number]: number,
  } = {
    50: 0.95,
    100: 0.9,
    200: 0.75,
    300: 0.6,
    400: 0.3,
    600: 0.9,
    700: 0.75,
    800: 0.6,
    900: 0.49,
  };

  [50, 100, 200, 300, 400].forEach((level) => {
    response.colors[level] = lighten(baseColor, intensityMap[level]);
  });

  [600, 700, 800, 900].forEach((level) => {
    response.colors[level] = darken(baseColor, intensityMap[level]);
  });

  return response;
}
