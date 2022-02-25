// @flow
import * as React from 'react';
import IconCamera from '../Icons/Icon-Camera';
import IconImage from '../Icons/Icon-Image';
import { useToast } from '../Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../Icons';
import { randomFileName, resizeImage } from '../../util/fileHelpers';

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

    const files = event?.target?.files || [];
    const src: Array<IUploadedImage> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      addToast(
        `Uploading ${file.name}`,
        theme.BASE_COLOR['brand-blue'],
        EIcons.INFO,
      );
      console.log('preResizeFile', file);
      const config = {
        file: file,
        maxSize: 1000,
        newFileName: `${randomFileName(10)}.jpg`,
      };
      const resizedImage = await resizeImage(config);
      console.log('postResizeFile', resizedImage);
      const data = new FormData();
      // @ts-ignore
      data.append('image', resizedImage);

      try {
        const response = await fetch(`/api/upload-images`, {
          method: 'post',
          body: data,
        });

        const img = await response.json();
        console.log(img);
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
      } catch (error) {
        console.log(error);
        addToast(
          'Error Uploading image',
          theme.BASE_COLOR.error,
          EIcons.EXCLAMATION_TRIANGLE,
        );
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
        className="flex rounded-md text-brand-500 px-2 py-1 mr-1 mb-1 "
      >
        <IconImage height={20} width={20} />
        {/* <span className="pl-2 text-sm">Images</span> */}
      </label>
    </>
  );
}
