import { ContentLoader } from "./contentLoader";
import { extractContent } from "./extractContent";
import { loadManifest } from "./loadManifest";
import { ContentQL, Docs, DocsVersions } from "./types";

const contentLoader = new ContentLoader();

export const generator = <T>(
  contentQL: ContentQL<T>[],
  folder: string,
  version?: string,
) => {
  contentLoader.setFolder(folder);
  if (version) {
    contentLoader.setVersion(version);
  }

  const manifestSpec = loadManifest(contentLoader.loadManifest()).spec;
  const content = extractContent<T>({ manifestSpec, contentQL, contentLoader });

  return {
    content,
    navigation: manifestSpec,
    manifest: manifestSpec,
  };
};
