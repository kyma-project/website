import React from "react";
import styled from "@styled";

const StyledImage = styled.img`
  margin: 16px 0;
  border-radius: 3px;
`;

interface ImageProps {
  alt: string;
  src: string;
  assetsPath?: string;
  renderedFileName?: string;
}

export const Image: React.FunctionComponent<ImageProps> = ({
  alt,
  src,
  assetsPath = "",
  renderedFileName = "",
}) => {
  const getAssetName = (path: string): string => {
    const fileNameRegex = /(.*?)\/(.*?).(jpeg|jpg|gif|png|svg)$/;
    const match = fileNameRegex.exec(path);

    if (match && match[2]) {
      const splitedName = match[2].split("/");
      return `${splitedName[splitedName.length - 1]}.${match[3]}`;
    }
    return "";
  };

  if (!assetsPath) {
    return null;
  }

  const assetName = getAssetName(src);
  if (!assetName) {
    return null;
  }

  return <StyledImage src={`${assetsPath}${assetName}`} alt={alt} />;
};
