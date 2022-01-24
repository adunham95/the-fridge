import { IIconProps } from '.';

const IconMenu = (props: IIconProps) => {
  return (
    <svg
      height={props.height}
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="bars"
      className="svg-inline--fa fa-bars fa-w-14"
      role="img"
      viewBox="0 0 448 512"
    >
      <path
        fill={props?.fill ? props.fill : 'currentColor'}
        d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
      />
    </svg>
  );
};

export default IconMenu;
