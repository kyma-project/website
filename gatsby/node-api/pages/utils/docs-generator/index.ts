import { ContentLoader } from "./contentLoader";
import {
  ContentGQL,
  DocsContent,
  DocsContentItem,
  DocsContentDocs,
  DocsNavigationTopic,
} from "./types";
import { extractContent } from "./extractContent";
import { loadManifest } from "./loadManifest";

import { Specification } from "@typings/docs";

const contentLoader = new ContentLoader();

export const docsGenerator = <T extends ContentGQL>(
  contentGQLs: T[],
  folder: string,
  extractFn: (
    doc: T,
    docsGroup: string,
    topicId: string,
  ) => DocsContentDocs | null,
  version?: string,
) => {
  const navigation: DocsNavigationTopic[] = [];
  contentGQLs.forEach(item => {
    const filePath = item.fields.slug as string;
    const navigationPath = filePath.split("/");
    addChildren(navigation, navigationPath, item);
  });

  //CREATE CONTENT
  // const content = {
  //   "master": {
  //     "aaa": {
  //       displayName:"aaaa",
  //       id:"a",
  //       description:"dadsas",
  //       specifications: [] as Specification[],
  //     } as DocsContentItem,
  //     // "bbb": {
  //     //   displayName:"bbbb",
  //     //   id:"b",
  //     //   specifications: [] as Specification[],
  //     // } as DocsContentItem
  //   }
  // } as DocsContent

  contentLoader.setFolder(folder);
  contentLoader.setVersion(version ? version : "");
  const manifestSpec = loadManifest(contentLoader.loadManifest()).spec;

  const content = extractContent<T>({
    manifestSpec,
    contentGQLs,
    contentLoader,
    extractFn,
  });

  return {
    content,
    // content: {} as DocsContent,
    navigation,
    manifest: navigation,
  };
};

export const addChildren = <T extends ContentGQL>(
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
      addChildren(navigationItem.children, navigationPath.slice(1), item);
      found = true;
      return;
    }
  });
  if (found) {
    return;
  }

  // create if not found
  const newDocsNavigationTopic = {
    id: navigationPath[0],
    displayName: navigationPath[0],
    children: [] as DocsNavigationTopic[],
  } as DocsNavigationTopic;
  addChildren(newDocsNavigationTopic.children, navigationPath.slice(1), item);

  // add child
  navigation.push(newDocsNavigationTopic);
};

export type DocsGeneratorReturnType = ReturnType<typeof docsGenerator>;
