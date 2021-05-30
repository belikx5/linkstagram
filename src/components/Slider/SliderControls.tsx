import "../../styles/slider.scss";
import React from "react";
import { ReactComponent as SliderLeft } from "./assets/slider-left.svg";
import { ReactComponent as SliderRight } from "./assets/slider-right.svg";
import { ReactComponent as Dot } from "./assets/dot.svg";
import { ReactComponent as DotActive } from "./assets/dot-active.svg";

type SliderControlsProps = {
  dotsCount: number;
  activeDot: number;
  onNextClick: Function;
  onPrevClick: Function;
  onGotoClick: Function;
};

function SliderControls({
  dotsCount = 1,
  activeDot = 0,
  onNextClick,
  onPrevClick,
  onGotoClick,
}: SliderControlsProps) {
  return dotsCount > 1 ? (
    <div className="slider-controls">
      <SliderLeft
        onClick={() => onPrevClick()}
        className="slider-controls-left"
      />
      <SliderRight
        onClick={() => onNextClick()}
        className="slider-controls-right"
      />
      <div className="slider-controls-dots">
        {Array.from(Array(dotsCount).keys()).map((dot) =>
          dot === activeDot ? (
            <DotActive key={dot} className="slider-controls-dot" />
          ) : (
            <Dot
              key={dot}
              className="slider-controls-dot"
              onClick={() => onGotoClick(dot)}
            />
          )
        )}
      </div>
    </div>
  ) : null;
}

export default SliderControls;
