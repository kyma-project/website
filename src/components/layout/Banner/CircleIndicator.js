import React from "react";
import { Circle, CircleWrapper } from "./styled";
const CircleIndicator = ({ slides, currentBanner, onCircleClick }) => {
  return (
    <CircleWrapper>
      {slides.map((_, index) => (
        <Circle
          key={index}
          active={index === currentBanner}
          onClick={() => onCircleClick(index)}
        />
      ))}
    </CircleWrapper>
  );
};

export default CircleIndicator;
