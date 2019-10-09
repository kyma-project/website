import { DOCS_PATH_NAME } from "@common/constants";
import { toKebabCase } from "@common/utils";

export const getDocsPath = (
  version: string,
  content?: {
    id: string;
    type: string;
    hash: string;
  },
) => {
  const versionPathPart = version ? `${version}/` : "";

  if (!content) {
    return `/${DOCS_PATH_NAME}/${versionPathPart}`;
  }

  const { id, type, hash } = content;

  if (!id && !type) {
    return `/${DOCS_PATH_NAME}/${versionPathPart}`;
  }

  return `/${DOCS_PATH_NAME}/${versionPathPart}${toKebabCase(
    type,
  )}/${toKebabCase(id)}/${hash ? `#${hash}` : ""}`;
};

export const getDocsPathLink = (version: string) => (content: {
  id: string;
  type: string;
  hash: string;
}) => getDocsPath(version, content);
