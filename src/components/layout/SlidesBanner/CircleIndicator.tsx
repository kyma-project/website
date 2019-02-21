import React from "react";

import { Slide } from "./types";

import { Circle, CircleWrapper } from "./styled";

interface CircleIndicatorProps {
  slides: Slide[];
  currentSlide: number;
  onCircleClick: Function;
}

const CircleIndicator: React.FunctionComponent<CircleIndicatorProps> = ({
  slides,
  currentSlide,
  onCircleClick,
}) => {
  return (
    <CircleWrapper>
      {slides.map((_, index: number) => (
        <Circle
          key={index}
          active={index === currentSlide}
          onClick={() => onCircleClick(index)}
        />
      ))}
    </CircleWrapper>
  );
};

export default CircleIndicator;
