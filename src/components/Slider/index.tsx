import "../../styles/slider.scss";
import React, { useState } from "react";
import SliderControls from "./SliderControls";

type SliderProps = {
  images: string[];
};

function Slider({ images }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const next = () => {
    setActiveIndex((current) => {
      return current === images.length - 1 ? 0 : current + 1;
    });
  };
  const prev = () => {
    setActiveIndex((current) => {
      return current === 0 ? images.length - 1 : current - 1;
    });
  };
  const goto = (num: number) => {
    setActiveIndex(num);
  };

  return (
    <div className="slider">
      <img src={images[activeIndex]} alt={images[activeIndex]} />
      <SliderControls
        dotsCount={images.length}
        activeDot={activeIndex}
        onGotoClick={goto}
        onNextClick={next}
        onPrevClick={prev}
      />
    </div>
  );
}

export default Slider;
