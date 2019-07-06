import { DocsLoader } from "./docsLoader";
import { extractContent } from "./extractContent";
import { loadManifest } from "./loadManifest";
import { generateNavigation } from "./generateNavigation";
import { DocQL, Docs, DocsVersions } from "../types";

export const generator = (docs: DocQL[], versions: DocsVersions) => {
  const docsArch: Docs = {} as Docs;

  Object.keys(versions).map(versionType => {
    versions[versionType].map((version, index) => {
      const docsLoader = new DocsLoader(version);
      const manifest = loadManifest(docsLoader.loadManifest()).spec;

      const content = extractContent({ version, manifest, docs, docsLoader });
      const navigation = generateNavigation(content);

      docsArch[version] = {
        content: content,
        navigation: navigation,
        manifest: manifest,
      };
    });
  });

  return docsArch;
};
