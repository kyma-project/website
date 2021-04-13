import { safeLoad } from "js-yaml";
import { NewBtrDocsManifest } from "./types";

export const loadManifest = (yaml: string): NewBtrDocsManifest =>
  safeLoad(yaml) as NewBtrDocsManifest;
