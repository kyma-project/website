import { DOCS_PATH_NAME } from "@common/constants";
import SOCIAL_MEDIA from "@common/socialMedia";

export const resolveSocialMedia = (media: string) => SOCIAL_MEDIA[media];

export const tokenize = (str?: string) => {
  if (!str) return "";

  return str
    .trim()
    .replace(/ /g, "-")
    .toLowerCase();
};

export const getActualYear = () => {
  const d = new Date();
  return d.getFullYear();
};

export const getDocsPath = (
  version: string,
  content?: {
    id: string;
    type: string;
    hash: string;
  },
) => {
  const versionPathPart = version ? `${version}/` : "";

  if (!content) return `/${DOCS_PATH_NAME}/${versionPathPart}`;

  const { id, type, hash } = content;

  if (!id && !type) {
    return `/${DOCS_PATH_NAME}/${versionPathPart}`;
  }

  return `/${DOCS_PATH_NAME}/${versionPathPart}${tokenize(type)}/${tokenize(
    id,
  )}${hash ? `#${hash}` : ""}`;
};

export const getDocsPathLink = (version: string) => (content: {
  id: string;
  type: string;
  hash: string;
}) => {
  return getDocsPath(version, content);
};
