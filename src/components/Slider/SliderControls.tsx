import "./slider.scss";
import React, { useRef } from "react";
import { ReactComponent as SliderLeft } from "./assets/slider-left.svg";
import { ReactComponent as SliderRight } from "./assets/slider-right.svg";
import { ReactComponent as Dot } from "./assets/dot.svg";
import { ReactComponent as DotActive } from "./assets/dot-active.svg";

type SliderControlsProps = {
  dotsCount: number;
  activeDot: number;
  onImageClick?: Function;
  onNextClick: Function;
  onPrevClick: Function;
  onGotoClick: Function;
};

function SliderControls({
  dotsCount = 1,
  activeDot = 0,
  onImageClick,
  onNextClick,
  onPrevClick,
  onGotoClick,
}: SliderControlsProps) {
  const controlsRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<SVGSVGElement>(null);
  const handleImageClick = (e: any) => {
    if (
      (controlsRef.current &&
        dotsRef.current &&
        !controlsRef.current.contains(e.target) &&
        !dotsRef.current.contains(e.target)) ||
      (!controlsRef.current && !dotsRef.current)
    )
      onImageClick && onImageClick();
  };
  return (
    <div className="slider-controls" onClick={handleImageClick}>
      {dotsCount > 1 ? (
        <>
          <div ref={controlsRef}>
            <SliderLeft
              onClick={() => onPrevClick()}
              className="slider-controls-left"
            />
          </div>
          <div ref={controlsRef}>
            <SliderRight
              onClick={() => onNextClick()}
              className="slider-controls-right"
            />
          </div>

          <div className="slider-controls-dots">
            {Array.from(Array(dotsCount).keys()).map((dot) =>
              dot === activeDot ? (
                <DotActive
                  key={dot}
                  ref={dotsRef}
                  className="slider-controls-dot"
                />
              ) : (
                <Dot
                  key={dot}
                  ref={dotsRef}
                  className="slider-controls-dot"
                  onClick={() => onGotoClick(dot)}
                />
              )
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SliderControls;
