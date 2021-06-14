import { DOCS_PATH_NAME } from "@common/constants";
import { join } from "path";
import { toKebabCase } from "@common/utils";

export const getDocsPath = (
  version: string,
  content?: {
    id: string;
    repoName: string;
    hash: string;
  },
) => {
  const versionPathPart = version ? `${version}/` : "";

  if (!content) {
    return `/${DOCS_PATH_NAME}/${versionPathPart}`;
  }

  const { id, repoName, hash } = content;

  if (!id && !repoName) {
    return `/${DOCS_PATH_NAME}/${versionPathPart}`;
  }

  return join("/", DOCS_PATH_NAME, toKebabCase(repoName), versionPathPart);
};

export const getDocsPathLink = (version: string) => (content: {
  id: string;
  repoName: string;
  hash: string;
}) => getDocsPath(version, content);
