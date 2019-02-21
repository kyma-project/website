import { css } from "@styled";

import { TimingFunction } from "./theme";

export const linkEffect = css`
  &:before {
    display: inline-block;
    opacity: 0;
    transition: transform 0.3s, opacity 0.2s;
    margin-left: 10px;
    content: "[";
    transform: translateX(10px);
  }

  &:after {
    display: inline-block;
    opacity: 0;
    transition: transform 0.3s, opacity 0.2s;
    margin-right: 10px;
    content: "]";
    transform: translateX(-10px);
  }

  &:active:before,
  &:focus:before,
  &:hover:before {
    opacity: 1;
    transform: translateX(-10px);
  }

  &:active:after,
  &:focus:after,
  &:hover:after {
    opacity: 1;
    transform: translateX(10px);
  }
`;

export const transitionEffect = (
  property: string,
  timingFunction: TimingFunction,
) => css`
  transition: ${property} ${props => props.theme.animation.duration}
    ${props => props.theme.animation.delay} ${timingFunction};
`;

export const customScrollBar = ({
  thumbColor,
  trackColor,
}: {
  thumbColor: string;
  trackColor: string;
}) => css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${thumbColor};
  }

  &::-webkit-scrollbar-track {
    background: ${trackColor};
    border-radius: 0 0 5px 5px;
  }
`;
