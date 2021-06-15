import { Specification } from "@typings/docs";
import { readFileSync } from "fs-extra";
import { safeLoad } from "js-yaml";
import { dirname, join, resolve } from "path";
import {
  ContentGQL,
  DocsContent,
  DocsContentDocs,
  DocsContentItem,
  DocsNavigationTopic,
} from "./types";

const createSpecification = (values: { uri: string; fileAbsPath: string }) => {
  const directoryName = dirname(values.fileAbsPath);
  const specPath = join(directoryName, values.uri);
  const data = readFileSync(specPath).toString();
  const spec = safeLoad(data) as {
    info: {
      title: string;
      description: string;
      version: string;
    };
    spec: any;
  };

  const splittedURI = values.uri.split("/");
  const specID = splittedURI[splittedURI.length - 1].replace(".yaml", "");
  return {
    id: specID,
    type: "openapi",
    assetPath: values.uri,
    info: {
      title: spec.info.title,
      version: spec.info.version,
      description: spec.info.description,
    },
    spec,
  } as Specification;
};

export const docsGenerator = <T extends ContentGQL>(
  contentGQLs: T[],
  folder: string,
  version?: string,
) => {
  const navigation: DocsNavigationTopic[] = [];

  const documents = contentGQLs.filter(val => {
    if (folder.startsWith("docs")) {
      return val.fields.docInfo.version === version;
    }

    return val.fileAbsolutePath.includes(folder);
  });

  const docsContentForNodes = [] as ContentGQL[];

  documents.forEach(item => {
    if (item.fields.slug.endsWith("README.md")) {
      docsContentForNodes.push(item);
    } else {
      const filePath = item.fields.slug.replace(".md", "") as string;
      const navigationPath = filePath.split("/");
      addNavigationItem(navigation, navigationPath, item);
    }
  });

  const absPath = documents[0].fileAbsolutePath;
  const slug = documents[0].fields.slug;
  const basePath = absPath.replace(slug, "");

  defaultMetadataForNodes(navigation, basePath, []);

  docsContentForNodes.forEach(item => {
    const filePath = item.fields.slug.replace("/README.md", "") as string;
    const navigationPath = filePath.split("/");
    markNodeWithContent(navigation, navigationPath);
  });

  const newBetterContent = {} as DocsContent;

  documents.forEach(content => {
    const newItem = {} as DocsContentItem;
    const id = content.fields.slug.replace(".md", "");
    newItem.id = id;
    newItem.displayName = content.frontmatter.title;
    newItem.type = "component";

    const doc = {} as DocsContentDocs;
    doc.order = content.fields.slug;
    doc.title = content.frontmatter.title;
    doc.source = content.rawMarkdownBody;
    doc.imagesSpec = content.fields.imagesSpec;
    doc.type = "";

    newItem.docs = [doc];
    newItem.specifications = extractSpecification(
      content.fileAbsolutePath,
      content.frontmatter.specifications,
    );
    newBetterContent[id] = newItem;
  });

  return {
    content: newBetterContent,
    navigation,
    manifest: navigation,
  };
};

const extractSpecification = (
  absPath: string,
  frontMatterSpecs?: string[],
): Specification[] => {
  if (!frontMatterSpecs) {
    return [];
  }
  return frontMatterSpecs
    .map(uri => ({
      uri,
      fileAbsPath: absPath,
    }))
    .map(createSpecification);
};

export const addNavigationItem = <T extends ContentGQL>(
  navigation: DocsNavigationTopic[],
  navigationPath: string[],
  item: T,
): void => {
  if (navigationPath.length === 0) {
    return;
  }

  let found: boolean = false;
  navigation.forEach(navigationItem => {
    if (navigationPath[0] === navigationItem.id) {
      addNavigationItem(navigationItem.children, navigationPath.slice(1), item);
      found = true;
      return;
    }
  });
  if (found) {
    return;
  }

  let displayName = "";
  if (navigationPath.length === 1) {
    displayName = item.frontmatter.title;
  }

  // create if not found
  const newDocsNavigationTopic = {
    id: navigationPath[0],
    displayName,
    children: [] as DocsNavigationTopic[],
    noContent: false,
  } as DocsNavigationTopic;

  addNavigationItem(
    newDocsNavigationTopic.children,
    navigationPath.slice(1),
    item,
  );

  // add child
  navigation.push(newDocsNavigationTopic);
};

export type DocsGeneratorReturnType = ReturnType<typeof docsGenerator>;

export const defaultMetadataForNodes = (
  navigation: DocsNavigationTopic[],
  basePath: string,
  navigationPath: string[],
): void => {
  navigation.forEach(item => {
    if (item.children.length !== 0) {
      item.noContent = true;
      const currentNavigation = navigationPath.slice();
      currentNavigation.push(item.id);
      item.displayName = getDisplayNameForNode(basePath, currentNavigation);
      defaultMetadataForNodes(item.children, basePath, currentNavigation);
    }
  });
};

export const getDisplayNameForNode = (
  basePath: string,
  navigationPath: string[],
): string => {
  const metadataPath = join(
    basePath,
    navigationPath.join("/"),
    "metadata.yaml",
  );
  const file = readFileSync(resolve(metadataPath)).toString();
  const data = safeLoad(file) as DirMetadata;

  return data.displayName;
};

export const markNodeWithContent = (
  navigation: DocsNavigationTopic[],
  filePath: string[],
): void => {
  navigation.forEach(navigationItem => {
    if (navigationItem.id === filePath[0]) {
      if (filePath.length === 1) {
        navigationItem.noContent = false;
      } else {
        markNodeWithContent(navigationItem.children, filePath.slice(1));
      }
    }
  });
};

export interface DirMetadata {
  displayName: string;
}
