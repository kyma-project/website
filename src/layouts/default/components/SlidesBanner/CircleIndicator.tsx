import React from "react";

import { Slide } from "@typings/landingPage";

import { Circle, CircleWrapper } from "./styled";

interface CircleIndicatorProps {
  slides: Slide[];
  currentSlide: number;
  onCircleClick: (index: number) => void;
}

const CircleIndicator: React.FunctionComponent<CircleIndicatorProps> = ({
  slides,
  currentSlide,
  onCircleClick,
}) => (
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

export default CircleIndicator;
