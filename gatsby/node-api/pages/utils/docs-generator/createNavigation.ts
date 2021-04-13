import { toArray } from "./helpers";
import { ManifestSpec, ManifestItem, DocsNavigation } from "./types";

//TODO: Czy to jest potrzebne?
export const createNavigation = (
  manifestSpec: ManifestSpec,
): DocsNavigation => {
  const navigation: DocsNavigation = manifestSpec;

  // working on reference
  Object.keys(manifestSpec).map(key => {
    manifestSpec[key] = toArray<ManifestItem>(manifestSpec[key]);
  });

  return navigation;
};
