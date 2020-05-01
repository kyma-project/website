import React from "react";

export interface ImageProps {
  alt: string;
  src: string;
}

export const Image: React.FunctionComponent<ImageProps> = ({ alt, src }) => (
  <a href={src} target="_blank" rel="noopener noreferrer">
    <img data-src={src} alt={alt} className="lazyload cms__image" />
  </a>
);
