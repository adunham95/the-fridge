// @flow
import * as React from 'react';
type Props = {
  images: Array<string>,
  onDoubleClick?: () => void,
};
export function ImageSlider({ images, onDoubleClick = () => {} }: Props) {
  const [currentImg, setCurrentImg] = React.useState(1);

  if (images.length === 1) {
    return (
      <div onDoubleClick={onDoubleClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={images[0]}
          src={images[0]}
          className={`object-contain aspect-auto min-w-full rounded-md border border-gray-100 snap-start`}
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar scroll-smooth"
      onDoubleClick={onDoubleClick}
    >
      {images.map((img, i) => (
        <SlideImg
          key={img}
          img={img}
          setIsVisible={(isVisible) => {
            isVisible && setCurrentImg(i + 1);
          }}
        />
      ))}
      <div className="sticky h-[2em] top-1 right-2 text-xs bg-slate-500 bg-opacity-40 text-white p-1 rounded flex justify-center items-center">
        <span>
          <span>{currentImg}</span>/<span>{images.length}</span>
        </span>
      </div>
    </div>
  );
}

interface ISlideImg {
  img: string;
  setIsVisible: (isVisible: boolean) => void;
}

const SlideImg = ({ img, setIsVisible }: ISlideImg) => {
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
        key={img}
        src={img}
        className={`object-contain aspect-[4/3] min-w-full rounded-md border border-gray-400 snap-start`}
      />
    </div>
  );
};
