import { safeLoad } from "js-yaml";
import { DocsManifest } from "./types";

export const loadManifest = (yaml: string): DocsManifest =>
  safeLoad(yaml) as DocsManifest;
