// @flow
import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../hooks/useWidowSize';
import { IImage } from '../../models/IImage';
import IconArrowCircle from '../Icons/Icon-Arrow-Circle';
type Props = {
  images: Array<IImage>,
};
export function ImageCarousel({ images }: Props) {
  const slideWidth = 81;
  const slideElm = useRef<HTMLDivElement>(null);
  const [visibleSlides, setVisibleSlides] = useState(images.length);
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeImg, setActiveImg] = useState(images[0]?.url || '');
  const { width } = useWindowSize();

  useEffect(() => {
    if (images[activeThumb]) {
      setActiveImg(images[activeThumb].url);
      slideElm.current?.scroll({
        top: 0,
        left: slideWidth * activeThumb,
        behavior: 'smooth',
      });
    }
  }, [activeThumb]);

  useEffect(() => {
    if (images.length > 3) {
      width > 370 ? setVisibleSlides(4) : setVisibleSlides(3);
    }
  }, [width]);

  function setSlide(action: 'Next' | 'Back' | 'Slide', slideNub = 0) {
    if (action === 'Next') {
      const nextThumb = activeThumb + 1;
      const nextSlide =
        activeSlide + 1 > images.length - 1 ? 0 : activeSlide + 1;
      nextThumb > images.length - 1
        ? setActiveThumb(0)
        : setActiveThumb(nextThumb);
      setActiveSlide(nextSlide);
    }
    if (action === 'Back') {
      const nextThumb = activeThumb - 1;
      const nextSlide =
        activeSlide - 1 < 0 ? images.length - 1 : activeSlide - 1;
      nextThumb < 0
        ? setActiveThumb(images.length - 1)
        : setActiveThumb(nextSlide);
      setActiveSlide(nextSlide);
    }
    if (action === 'Slide') {
      const nextSlide = slideNub;
      setActiveThumb(slideNub);
      setActiveSlide(nextSlide);
    }
  }

  return (
    <div className="w-full">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          src={activeImg}
          className={`w-full rounded-md ${
            images.length > 1 ? 'aspect-[4/3]' : 'aspect-auto'
          } object-contain border border-gray-100`}
        />
      </div>
      {images.length > 1 && (
        <div className="pt-2 flex justify-center">
          <button onClick={() => setSlide('Back')}>
            <span className="rotate-[270deg] transition-transform block">
              <IconArrowCircle
                height={30}
                width={30}
                className="fill-brand-400 hover:fill-brand-600"
              />
            </span>
          </button>
          <div
            style={{ width: slideWidth * visibleSlides }}
            ref={slideElm}
            className=" overflow-x-hidden flex flex-nowrap"
          >
            {images.map((img, i) => (
              <button
                key={`thumb-${img.id}`}
                onClick={() => setSlide('Slide', i)}
                className="p-2 w-full max-w-[100px]"
              >
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    src={img.url}
                    className={`rounded-md h-[65px] min-w-[65px] aspect-square object-cover inline-block border-2  ${
                      activeThumb === i && 'border-brand-400'
                    }`}
                  />
                </>
              </button>
            ))}
          </div>
          <button onClick={() => setSlide('Next')}>
            <span className="rotate-90 transition-transform block">
              <IconArrowCircle
                height={30}
                width={30}
                className="fill-brand-400 hover:fill-brand-600"
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
