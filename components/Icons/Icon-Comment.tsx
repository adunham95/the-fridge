import { IIconProps } from '.';

const IconComment = (props: IIconProps) => {
  return (
    <svg
      height={props.height}
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="comment"
      className="svg-inline--fa fa-comment fa-w-16"
      role="img"
      viewBox="0 0 512 512"
    >
      <path
        fill={props?.fill ? props.fill : 'currentColor'}
        d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
      />
    </svg>
  );
};

export default IconComment;
