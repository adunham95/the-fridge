// @flow
import React, { useState } from 'react';
import { IPost } from '../../models/PostModel';
import { Avatar } from '../Avatar/Avatar';

export function PostCardSmall({
  id,
  description = '',
  image = [],
  postedBy,
}: IPost) {
  const [selectedImage, setSelectedImage] = useState(image[0]);

  function changeImage() {
    if (image.length > 1) {
      const currentIndex = image.indexOf(selectedImage);
      const nextIndex = currentIndex + 1;
      const nextActive = nextIndex > image.length - 1 ? 0 : nextIndex;
      setSelectedImage(image[nextActive]);

      //   console.log({ currentIndex, nextIndex });
    }
  }

  return (
    <div id={id} className=" aspect-square w-1/3 p-1">
      <div
        style={{ backgroundImage: `url(${selectedImage})` }}
        className="bg-green-200 rounded-md bg-no-repeat bg-cover w-full h-full relative"
      >
        <div className="absolute top-1 left-1">
          <Avatar name={postedBy.name} color={postedBy.accountColor} />
        </div>
        {description !== '' && (
          <div className="p-1 absolute bottom-0 bg-white bg-opacity-40 w-full border-t border-white text-sm">
            <p className=" text-slate-700">{description}</p>
          </div>
        )}
        {image.length > 1 && (
          <button
            onClick={changeImage}
            className="bg-transparent absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-1/2 h-1/2"
          />
        )}
      </div>
    </div>
  );
}
