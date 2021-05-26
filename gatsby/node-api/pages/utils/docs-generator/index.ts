import {
  ContentGQL,
  DocsContent,
  DocsContentItem,
  DocsContentDocs,
  DocsNavigationTopic,
} from "./types";

import { resolve } from "path";

import { Specification } from "@typings/docs";
import { readFileSync } from "fs-extra";
import { safeLoad } from "js-yaml";

export const docsGenerator = <T extends ContentGQL>(
  contentGQLs: T[],
  folder: string,
  version?: string,
) => {
  const navigation: DocsNavigationTopic[] = [];

  const documents = contentGQLs.filter(val => {
    //docs has versioning
    if (folder.startsWith("docs")) {
      return val.fields.docInfo.version === version;
    }

    return val.fileAbsolutePath.includes(folder);
  });

  const docsContentForNodes = [] as ContentGQL[];

  documents.forEach(item => {
    if (item.fields.slug.endsWith("index.md")) {
      docsContentForNodes.push(item);
    } else {
      const filePath = item.fields.slug.replace(".md", "") as string;
      const navigationPath = filePath.split("/");
      addNavigationItem(navigation, navigationPath, item);
    }
  });

  markNodes(navigation);

  docsContentForNodes.forEach(item => {
    const filePath = item.fields.slug.replace("/index.md", "") as string;
    const navigationPath = filePath.split("/");
    markNodeWithContent(navigation, navigationPath);
  });

  const newBetterContent = {} as DocsContent;

  // const newBetterContent = {
  //   component: {},
  // } as DocsContent;

  documents.forEach(content => {
    const tmpObj = {} as DocsContentItem;
    const id = content.fields.slug.replace(".md", "");
    tmpObj.id = id;
    tmpObj.displayName = content.frontmatter.title;
    tmpObj.type = "component";

    const tmpDoc = {} as DocsContentDocs;
    tmpDoc.order = content.fields.slug;
    tmpDoc.title = content.frontmatter.title;
    tmpDoc.source = content.rawMarkdownBody;
    tmpDoc.imagesSpec = content.fields.imagesSpec;
    tmpDoc.type = "";

    tmpObj.docs = [tmpDoc];
    tmpObj.specifications = [] as Specification[];

    newBetterContent[id] = tmpObj;
  });

  return {
    content: newBetterContent,
    navigation,
    manifest: navigation,
  };
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
  } else {
    const path = item.fileAbsolutePath.split("/");
    const dirPath = path.slice(0, path.length - 1);
    dirPath.push("metadata.yaml");

    const metadataPath = dirPath.join("/");

    const file = readFileSync(resolve(metadataPath)).toString();
    const data = safeLoad(file) as DirMetadata;

    displayName = data.displayName;
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

export const markNodes = (navigation: DocsNavigationTopic[]): void => {
  navigation.forEach(item => {
    if (item.children.length !== 0) {
      item.noContent = true;
      markNodes(item.children);
    }
  });
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
