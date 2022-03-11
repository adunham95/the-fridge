// @flow
import * as React from 'react';
import { IImage } from '../../models/IImage';
import IconArrowCircle from '../Icons/Icon-Arrow-Circle';

type Props = {
  images: Array<IImage>,
  onDoubleClick?: () => void,
};
export function ImageSlider({ images, onDoubleClick = () => {} }: Props) {
  const [currentImg, setCurrentImg] = React.useState(1);
  const slideElm = React.useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = React.useState(true);

  if (images.length === 1) {
    return (
      <div onDoubleClick={onDoubleClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={images[0].id}
          src={images[0].url}
          className={`object-contain aspect-auto min-w-full rounded-md border border-gray-100 snap-start`}
        />
      </div>
    );
  }

  function setSlide(action: 'Next' | 'Back') {
    if (action === 'Next') {
      const nextSlide = currentImg + 1 > images.length ? 0 : currentImg;
      setCurrentImg(nextSlide - 1);

      console.log(nextSlide);
      console.log(slideElm.current?.clientWidth);

      slideElm.current?.scroll({
        top: 0,
        left: slideElm.current?.clientWidth * nextSlide,
        behavior: 'smooth',
      });
    }
    if (action === 'Back') {
      const nextSlide =
        currentImg - 1 <= 0 ? images.length - 1 : currentImg - 2;
      setCurrentImg(nextSlide - 1);

      console.log({ nextSlide, currentImg, next: currentImg - 1 <= 0 });

      slideElm.current?.scroll({
        top: 0,
        left: slideElm.current?.clientWidth * nextSlide,
        behavior: 'smooth',
      });
    }
  }

  return (
    <>
      <div
        className="relative flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar scroll-smooth"
        onDoubleClick={onDoubleClick}
        ref={slideElm}
      >
        {images.map((img, i) => (
          <SlideImg
            key={img.id}
            img={img.url}
            setIsVisible={(isVisible) => {
              isVisible && setCurrentImg(i + 1);
            }}
          />
        ))}
      </div>
      <div className="absolute h-[2em] top-2 right-5 text-xs bg-slate-500 bg-opacity-40 text-white p-1 rounded flex justify-center items-center">
        <span>
          <span>{currentImg}</span>/<span>{images.length}</span>
        </span>
      </div>
      {hovering && (
        <>
          <button
            className="absolute right-6 inset-y-center"
            onClick={() => setSlide('Next')}
          >
            <span className="rotate-[90deg] transition-transform block">
              <IconArrowCircle
                height={30}
                width={30}
                className="fill-brand-400 hover:fill-brand-600"
              />
            </span>
          </button>
          <button
            className="absolute left-6 inset-y-center"
            onClick={() => setSlide('Back')}
          >
            <span className="rotate-[270deg] transition-transform block">
              <IconArrowCircle
                height={30}
                width={30}
                className="fill-brand-400 hover:fill-brand-600"
              />
            </span>
          </button>
        </>
      )}
    </>
  );
}

interface ISlideImg {
  img: string;
  setIsVisible: (isVisible: boolean) => void;
}

const SlideImg = ({ img, setIsVisible }: ISlideImg) => {
  console.log(img);
  const slideImg = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  function callback(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    setInView(entry.isIntersecting);
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.75,
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (slideImg.current) {
      observer.observe(slideImg.current);
    }

    return () => {
      if (slideImg.current) observer.unobserve(slideImg.current);
    };
  }, [slideImg, options]);

  return (
    <div ref={slideImg} className="object-contain aspect-[4/3] min-w-full p-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        className={`object-contain aspect-[4/3] min-w-full rounded-md border border-gray-400 snap-start`}
      />
    </div>
  );
};
