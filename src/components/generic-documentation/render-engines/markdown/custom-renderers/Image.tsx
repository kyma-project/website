import React from "react";
import styled from "@styled";
import { ImageSpec } from "../../../../../../gatsby/types";

interface StyledImageProps {
  originalWidth: number;
  originalHeight: number;
}

const StyledImage = styled.img<StyledImageProps>`
  max-width: 100%;
  max-height: ${props => `${props.originalHeight}px`};
  width: ${props => `${props.originalWidth}px`};
  height: auto;
`;

export interface ImageProps {
  alt: string;
  src: string;
  imagesSpec: ImageSpec[];
}

export const Image: React.FunctionComponent<ImageProps> = ({
  alt,
  src,
  imagesSpec = [],
}) => {
  const imagePaths = src.split("/");
  const imageName = imagePaths[imagePaths.length - 1];

  const image = imagesSpec.find(img => img.name === imageName);
  if (!image) {
    return (
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} className="cms__image" />
      </a>
    );
  }

  const { width, height } = image;
  const srcPlaceholder = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

  return (
    <>
      <noscript>
        <img src={src} alt={alt} />
      </noscript>
      <a href={src} target="_blank" rel="noopener noreferrer">
        <StyledImage
          originalWidth={width}
          originalHeight={height}
          src={srcPlaceholder}
          data-src={src}
          alt={alt}
          className="lazyload cms__image"
        />
      </a>
    </>
  );
};
