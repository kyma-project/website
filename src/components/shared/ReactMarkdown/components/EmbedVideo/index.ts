import { IEmbedVideoOptions } from "gatsby-remark-embed-video/src/interfaces";
import {
  defaultOptions,
  knownPlatforms,
} from "gatsby-remark-embed-video/src/config";

import { embedVideoHTML } from "./helpers";

const overrideDefaultOptions = (
  options?: IEmbedVideoOptions,
): IEmbedVideoOptions => {
  const videoOptions = options
    ? { ...defaultOptions, ...options }
    : { ...defaultOptions };

  if (!videoOptions.height) {
    videoOptions.height = Math.round(videoOptions.width / videoOptions.ratio);
  }

  return videoOptions;
};

export default (value: string) => {
  const options = overrideDefaultOptions({
    width: 850,
    ratio: 1.77,
    related: false,
    noIframeBorder: true,
  });

  const keywords = [...knownPlatforms(), "video"].join("|");
  const re = new RegExp(`\(${keywords}\):\(\.\*\)`, "i");

  const processValue = value.match(re);
  if (processValue) {
    const type = processValue[1];
    const id = processValue[2].trim();

    const video = embedVideoHTML(type, id, options);

    if (video.includes("Error")) {
      return null;
    }
    return video;
  }
  return null;
};
