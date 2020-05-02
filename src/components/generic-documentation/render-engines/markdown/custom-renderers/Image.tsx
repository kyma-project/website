import React from "react";
import styled from "@styled";
import { ImageWithAspectRatio } from "../../../../../../gatsby/types";

interface StyledImageProps {
  width: number;
  height: number;
  aspectRatio: number;
}

const StyledImage = styled.img<StyledImageProps>`
  max-width: ${props => props.width};
  max-height: ${props => props.height};
  height: auto;
`;

export interface ImageProps {
  alt: string;
  src: string;
  // Workaround,TODO: Remove it after update documentation-component
  imagesWithAspectRatio: ImageWithAspectRatio[];
}

export const Image: React.FunctionComponent<ImageProps> = ({
  alt,
  src,
  imagesWithAspectRatio = [],
}) => {
  const imagePaths = src.split("/");
  const imageName = imagePaths[imagePaths.length - 1];

  const image = imagesWithAspectRatio.find(img => img.imageName === imageName);
  if (!image) {
    return null;
  }

  const { aspectRatio, originalWidth, originalHeight } = image;
  const srcPlaceholder = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${originalWidth} ${originalHeight}"%3E%3C/svg%3E`;

  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <StyledImage
        aspectRatio={aspectRatio}
        width={originalWidth}
        height={originalHeight}
        src={srcPlaceholder}
        data-src={src}
        alt={alt}
        className="lazyload cms__image"
      />
    </a>
  );
};
