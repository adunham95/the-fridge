// @flow
import * as React from 'react';
import IconCamera from '../Icons/Icon-Camera';
import IconImage from '../Icons/Icon-Image';
import { useToast } from '../Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../Icons';

interface IImageUploadProps {
  id: string;
  multiple?: boolean;
  onUpload: (images: Array<IUploadedImage>) => void;
}

export interface IUploadedImage {
  url: string;
  name?: string;
  id?: string;
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
  const { addToast } = useToast();
  async function onLoad(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target);
    console.log(event.target.files);
    const maxFileSize = 10485760;

    const files = event?.target?.files || [];
    const src: Array<IUploadedImage> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);
      if (file.size > maxFileSize) {
        addToast(
          `${file.name} is too large`,
          theme.BASE_COLOR.error,
          EIcons.EXCLAMATION_TRIANGLE,
        );
        return;
      }
      addToast(
        `Uploading ${file.name}`,
        theme.BASE_COLOR['brand-blue'],
        EIcons.INFO,
      );
      // src.push({ src: URL.createObjectURL(file) });
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'fridge-images');

      // @ts-ignore
      data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_NAME);

      // @ts-ignore
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
        {
          method: 'post',
          body: data,
        },
      );
      const img = await response.json();
      if (img.error) {
        addToast(
          'Error Uploading image',
          theme.BASE_COLOR.error,
          EIcons.EXCLAMATION_TRIANGLE,
        );
      }
      if (img.url) {
        addToast(
          `Success uploading ${file.name}`,
          theme.BASE_COLOR.success,
          EIcons.CHECK_CIRCLE,
        );
        src.push(img);
      }
    }

    console.log({ src });
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
