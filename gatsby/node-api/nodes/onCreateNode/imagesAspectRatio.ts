import { Node } from "gatsby";
import { imageSize } from "image-size";
import { dirname } from "path";
import fs from "fs-extra";

import { CreateNodeField, ImageWithAspectRatio } from "../../../types";
import { ASSETS_DIR } from "../../../constants";

export enum NodeType {
  BLOG = "blog",
  DOCS = "docs",
  COMMUNITY = "community",
}

interface OnCreateImagesAspectRatioNode {
  node: Node;
  absolutePath: string;
  createNodeField: CreateNodeField;
  nodeType: NodeType;
}

export const onCreateImagesAspectRatioNode = ({
  node,
  absolutePath,
  createNodeField,
  nodeType,
}: OnCreateImagesAspectRatioNode) => {
  const dir = dirname(absolutePath);

  let imagesWithAspectRatio = {};
  switch (nodeType) {
    case NodeType.COMMUNITY:
    case NodeType.DOCS:
      imagesWithAspectRatio = calculateAspectRatio(`${dir}/${ASSETS_DIR}`);
      break;
    case NodeType.BLOG:
      imagesWithAspectRatio = calculateAspectRatio(`${dir}/`);
      break;
    default:
      return;
  }

  createNodeField({
    node,
    name: "imagesWithAspectRatio",
    value: imagesWithAspectRatio,
  });
};

const imagesCache: { [name: string]: ImageWithAspectRatio } = {};

function calculateAspectRatio(dir: string) {
  const imagesWithAspectRatio: ImageWithAspectRatio[] = [];

  fs.readdir(dir, (err, files) => {
    if (err) {
      return;
    }

    files.forEach(file => {
      const imgAbsPath = `${dir}${file}`;
      if (imagesCache[imgAbsPath]) {
        imagesWithAspectRatio.push(imagesCache[imgAbsPath]);
        return;
      }

      try {
        const { width, height } = imageSize(imgAbsPath);
        if (!width || !height) {
          return;
        }

        const aspectRatio = width / height;
        const image = {
          imageName: file,
          originalWidth: width,
          originalHeight: height,
          aspectRatio,
        };

        imagesCache[imgAbsPath] = image;
        imagesWithAspectRatio.push(image);
      } catch (err) {
        return;
      }
    });
  });

  return imagesWithAspectRatio;
}
