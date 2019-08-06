import { populateObject } from "./helpers";
import { ManifestSpec, ManifestItem, DocsNavigation } from "./types";

export const createNavigation = (
  manifestSpec: ManifestSpec,
): DocsNavigation => {
  const navigation: DocsNavigation = manifestSpec;

  // working on reference
  Object.keys(manifestSpec).map(key => {
    manifestSpec[key] = populateObject<ManifestItem>(manifestSpec[key]);
  });

  return navigation;
};
