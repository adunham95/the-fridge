/* eslint-disable @next/next/no-img-element */
// @flow
import * as React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IUploadedImage } from './ImageUploader';
import type { XYCoord, Identifier } from 'dnd-core';
import update from 'immutability-helper'

type Props = {
  images: Array<IUploadedImage>,
};

export const ImageDragTypes = {
  IMAGE_CARD: 'imgCard',
};

export function ImageOrderer({ images }: Props) {

    const [imageSet, setImageSet] = React.useState(images);

    React.useEffect(()=>{
        setImageSet(images)
    },[images])

    const moveCard = React.useCallback((dragIndex: number, hoverIndex: number) => {
        console.log({dragIndex, hoverIndex})
        setImageSet((prevCards: IUploadedImage[]) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          }),
        )
      }, []);

      const renderCard = React.useCallback(
        (img: IUploadedImage, index: number) => {

          return (
            <SingleImage
              key={img.url}
              id={img.url}
              {...img}
              index={index}
              moveCard={moveCard}
            />
          )
        },
        [],
      )

      

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex overflow-x-auto pt-2">
        {imageSet.map((img, i) => renderCard(img, i))}
      </div>
    </DndProvider>
  );
}

interface SingleImageProps extends IUploadedImage {
  id: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

function SingleImage({ id, url, index, moveCard }: SingleImageProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    IDragItem,
    // eslint-disable-next-line prettier/prettier
    null,
    { handlerId: Identifier | null }
  >({
    accept: ImageDragTypes.IMAGE_CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ImageDragTypes.IMAGE_CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div className="h-[5em] aspect-square ml-[1em] my-[1em] relative" ref={ref} data-handler-id={handlerId}>
      <span className="absolute top-[-0.5em] left-[-0.5em] h-[1.5em] w-[1.5em] flex justify-center items-center rounded-full text-xs bg-brand-blue-600 text-white">
        {index}
      </span>
      {/* // eslint-disable-next-line react/jsx-key */}
      <img
        className="h-full object-cover rounded border border-gray-600"
        src={url}
      />
    </div>
  );
}
