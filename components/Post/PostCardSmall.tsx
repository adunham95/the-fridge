// @flow
import React, { useState } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { EPostPermission, IPost } from '../../models/PostModel';
import { EUserPermissions } from '../../models/UserModel';
import { Avatar } from '../Avatar/Avatar';
import Modal from '../Modal/Modal';
import { PostComments, PostCommentsButton } from './PostComments';
import { PostLikes } from './PostLikes';

export function PostCardSmall({
  id,
  description = '',
  image = [],
  comments = [],
  likedBy = [],
  permissions = [],
  postedBy,
  org,
}: IPost) {
  const [selectedImage, setSelectedImage] = useState(image[0]);
  const { userHasPermissions } = usePermissions();

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
    <>
      <div id={id} className="aspect-square w-1/2  md:w-1/3 p-1">
        <div
          style={{ backgroundImage: `url(${selectedImage})` }}
          className="bg-green-200 rounded-md bg-no-repeat bg-cover w-full h-full relative"
        >
          <div className="absolute top-1 left-1">
            <Avatar name={postedBy.name} color={postedBy.accountColor} />
          </div>
          {description !== '' && (
            <div className="p-1 absolute bottom-0 bg-white bg-opacity-80 w-full border-t border-white text-sm">
              <p className=" text-slate-700">{description}</p>
            </div>
          )}
          {image.length > 1 && (
            <button
              onClick={changeImage}
              className="bg-transparent absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-1/2 h-1/2"
            />
          )}
          {image.length > 1 && (
            <div className="absolute flex flex-col left-1 top-[50%] -translate-y-1/2">
              {image.map((img) => (
                <span
                  key={img}
                  className={`h-[0.35em] w-[0.35em] rounded-full m-[2px] border  ${
                    img === selectedImage
                      ? 'bg-gray-200 border-gray-700'
                      : 'bg-gray-700 border-gray-200'
                  }`}
                ></span>
              ))}
            </div>
          )}
          <div className="absolute flex flex-col right-0 top-0 p-1 bg-white bg-opacity-60 rounded-bl border-b border-l">
            <PostLikes likes={likedBy} postID={id} />
            {userHasPermissions({
              orgID: org.id,
              hasNotPermissions: [EPostPermission.DISALLOW_COMMENT],
              additionalPermissions: permissions,
            }) && (
              <PostCommentsButton
                id={id}
                comments={comments}
                className="pt-1"
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        id={`${id}-comments`}
        position="center bottom"
        background="light"
        className="w-full sm:max-w-[500px] rounded-t-md"
        closeClassName="bg-rose-400 text-white hover:text-rose-700 rounded-full h-[1em] w-[1em] shadow-sm flex justify-center items-center right-1"
      >
        <PostComments postID={id} orgID={org.id} permissions={permissions} />
      </Modal>
    </>
  );
}
