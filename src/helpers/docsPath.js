import { DOCS_PATH_NAME } from "../constants/docs";
import { tokenize } from "./tokenize";

export const getDocsPath = (version, content = {}) => {
  const { id, type, hash } = content;
  if (!id && !type) {
    return `/${DOCS_PATH_NAME}/${version}/`;
  }

  return `/${DOCS_PATH_NAME}/${version}/${tokenize(type)}/${tokenize(id)}${
    hash ? `#${hash}` : ""
  }`;
};
