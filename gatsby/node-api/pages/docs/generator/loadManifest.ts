import { safeLoad } from "js-yaml";
import { DocsManifest } from "../types";

export const loadManifest = (yaml: string): DocsManifest => {
  return safeLoad(yaml) as DocsManifest;
};
