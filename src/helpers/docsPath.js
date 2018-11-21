import { DOCS_PATH_NAME } from "../constants/docs";
import { tokenize } from "./tokenize";

export const getDocsPath = (
  version,
  content = {},
  includeVersionInPath = true,
) => {
  const { id, type, hash } = content;

  const versionPathPart = includeVersionInPath ? `${version}/` : "";

  if (!id && !type) {
    return `/${DOCS_PATH_NAME}/${versionPathPart}`;
  }

  return `/${DOCS_PATH_NAME}/${versionPathPart}${tokenize(type)}/${tokenize(
    id,
  )}${hash ? `#${hash}` : ""}`;
};
