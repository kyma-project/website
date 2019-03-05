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

interface CustomScrollBarProps {
  scrollbarWidth?: string;
  scrollbarHeight?: string;
  thumbColor?: string;
  thumbBorderRadius?: string;
  trackColor?: string;
  trackBorderRadius?: string;
}

export const customScrollBar = ({
  scrollbarWidth = "6px",
  scrollbarHeight = "6px",
  thumbColor = "#d4d4d4",
  thumbBorderRadius = "0",
  trackColor = "#f1f1f1",
  trackBorderRadius = "0",
}: CustomScrollBarProps) => css`
  &::-webkit-scrollbar {
    width: ${scrollbarWidth};
    height: ${scrollbarHeight};
  }

  &::-webkit-scrollbar-thumb {
    background: ${thumbColor};
    border-radius: ${thumbBorderRadius};
  }

  &::-webkit-scrollbar-track {
    background: ${trackColor};
    border-radius: ${trackBorderRadius};
  }
`;
