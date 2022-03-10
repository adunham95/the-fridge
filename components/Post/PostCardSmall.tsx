// @flow
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IPost } from '../../models/PostModel';
import { Avatar } from '../Avatar/Avatar';
import IconImages from '../Icons/Icon-Images';

export function PostCardSmall({
  id,
  description = '',
  image = [],
  postedBy,
}: IPost) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (image.length > 0) {
      setStyle({ backgroundImage: `url(${image[0]})` });
    }
  }, [image]);

  return (
    <Link href={`/post/${id}`} passHref>
      <a id={id} className="aspect-square w-1/2  md:w-1/3 lg:w-1/4 p-1">
        <div
          style={style}
          className="bg-gradient-to-br from-brand-300 to-brand-blue-500 rounded-md bg-no-repeat bg-cover w-full h-full relative"
        >
          <div className="absolute top-1 left-1">
            <Avatar name={postedBy.name} color={postedBy.accountColor} />
          </div>
          {description !== '' && image.length > 1 && (
            <div className="p-1 absolute bottom-0 bg-white bg-opacity-80 w-full border-t border-white text-sm">
              <p className=" text-slate-700 truncate text-ellipsis">
                {description}
              </p>
            </div>
          )}
          {description !== '' && image.length === 0 && (
            <div className="absolute inset-[2.5rem] text-sm flex justify-center items-start overflow-hidden">
              <p className="p-1 text-slate-700 bg-white bg-opacity-20 rounded">
                {description}
              </p>
            </div>
          )}
          {image.length > 1 && (
            <div className="absolute right-1 top-1 text-white p-1 flex justify-around w-[3em] bg-slate-800 bg-opacity-70 rounded">
              <IconImages width={'1em'} />
              {image.length}
            </div>
          )}
        </div>
      </a>
    </Link>
  );
}
