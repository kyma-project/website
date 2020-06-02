import { Node } from "gatsby";
import { imageSize } from "image-size";
import { dirname } from "path";
import fs from "fs-extra";

import { CreateNodeField, ImageSpec } from "../../../types";
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

const dirCache: { [dir: string]: ImageSpec[] } = {};

export const onCreateImagesSpecNode = ({
  node,
  absolutePath,
  createNodeField,
  nodeType,
}: OnCreateImagesAspectRatioNode) => {
  const dir = dirname(absolutePath);

  let imagesSpec: ImageSpec[] = [];
  if (dirCache[dir]) {
    imagesSpec = dirCache[dir];
  } else {
    switch (nodeType) {
      case NodeType.COMMUNITY:
      case NodeType.DOCS:
        imagesSpec = calculateAspectRatio(`${dir}/${ASSETS_DIR}`);
        break;
      case NodeType.BLOG:
        imagesSpec = calculateAspectRatio(`${dir}/`);
        break;
      default:
        return;
    }
    dirCache[dir] = imagesSpec;
  }

  createNodeField({
    node,
    name: "imagesSpec",
    value: imagesSpec,
  });
};

function calculateAspectRatio(dir: string): ImageSpec[] {
  const imagesSpec: ImageSpec[] = [];

  fs.readdir(dir, (err, files) => {
    if (err) {
      return;
    }

    files.forEach(name => {
      const imgAbsPath = `${dir}${name}`;

      try {
        const { width, height } = imageSize(imgAbsPath);
        if (!width || !height) {
          return;
        }

        imagesSpec.push({
          name,
          width,
          height,
        });
      } catch (err) {
        return;
      }
    });
  });

  return imagesSpec;
}
