// @flow
import * as React from 'react';
import IconCamera from '../Icons/Icon-Camera';
import IconImage from '../Icons/Icon-Image';

interface IImageUploadProps {
  id: string;
  multiple?: boolean;
  onUpload: (images: Array<IUploadedImage>) => void;
}

export interface IUploadedImage {
  src: string;
  name?: string;
}

export function CameraUploader({ id, onUpload }: IImageUploadProps) {
  function onLoad() {
    onUpload([]);
  }

  return (
    <>
      <input
        id={id}
        type="file"
        className=" hidden"
        accept="image/*"
        onChange={onLoad}
      />
      <label
        htmlFor={id}
        className="flex rounded-md bg-slate-500 text-white px-2 py-1 mr-1 mb-1"
      >
        <IconCamera height={20} width={20} />
        <span className="pl-2 text-sm">Images</span>
      </label>
    </>
  );
}

export function ImageUploader({
  id,
  multiple = true,
  onUpload,
}: IImageUploadProps) {
  function onLoad(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target);
    console.log(event.target.files);

    const files = event?.target?.files || [];
    const src: Array<IUploadedImage> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);
      src.push({ src: URL.createObjectURL(file) });
    }

    console.log(src);
    onUpload(src);
  }

  if (!('mediaDevices' in navigator)) {
    return null;
  }

  return (
    <>
      <input
        id={id}
        type="file"
        className=" hidden"
        accept="image/*"
        multiple={multiple}
        onChange={onLoad}
      />
      <label
        htmlFor={id}
        className="flex rounded-md bg-slate-500 text-white px-2 py-1 py-1 mr-1 mb-1"
      >
        <IconImage height={20} width={20} />
        <span className="pl-2 text-sm">Images</span>
      </label>
    </>
  );
}
